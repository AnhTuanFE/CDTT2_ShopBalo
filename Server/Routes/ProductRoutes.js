import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from './../Models/ProductModel.js';
import { admin, protect } from './../Middleware/AuthMiddleware.js';
import Category from '../Models/CategoryModel.js';
import Order from './../Models/OrderModel.js';
import Cart from '../Models/CartModel.js';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const productRoute = express.Router();

// GET PRODUCT
productRoute.get(
    '/',
    asyncHandler(async (req, res) => {
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1;
        const rating = Number(req.query.rating) || 0;
        const maxPrice = Number(req.query.maxPrice) || 0;
        const minPrice = Number(req.query.minPrice == 0 ? 1 : req.query.minPrice) || 0;
        const sortProducts = Number(req.query.sortProducts) || 1;
        let search = {},
            sort = {};
        if (req.query.keyword) {
            search.name = {
                $regex: req.query.keyword,
                $options: 'i',
            };
        }
        if (req.query.category) {
            search.category = req.query.category;
        }
        if (rating) {
            search.rating = { $gte: rating };
        }
        if (maxPrice && minPrice) {
            search.price = {
                $gte: minPrice,
                $lte: maxPrice,
            };
        }
        if (sortProducts == 1) sort.createdAt = -1;
        // if (sortProducts == 2) sort.numberOfOrder =-1;
        if (sortProducts == 3) sort.price = 1;
        if (sortProducts == 4) sort.price = -1;

        const count = await Product.countDocuments({ ...search });
        let products = await Product.find({ ...search })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort(sort);

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    }),
);

// GET ALL PRODUCT
productRoute.get(
    '/ProductAll',
    asyncHandler(async (req, res) => {
        const products = await Product.find({}).sort({ _id: -1 });
        const productSlice = products.slice(0, 10);
        res.json(productSlice);
    }),
);
//GET ALL COMMENT
productRoute.get(
    '/ProductCommentAll',
    asyncHandler(async (req, res) => {
        let commentArr = [];
        const products = await Product.find({}).sort({ _id: -1 }).populate('comments.user', 'name image');
        const filterProduct = products.filter((product) => product.comments != '');
        for (let i = 0; i < filterProduct.length; i++) {
            commentArr.push(...filterProduct[i].comments);
        }
        const commentSort = commentArr.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
        res.json(commentSort);
    }),
);
// GET ALL COMMENTS ONLY ONE PRODUCT
productRoute.get(
    '/:id/onlyProduct/allComments',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id).populate('comments.user', 'name image');
        const allComments = product?.comments?.sort(({ createdAt: b }, { createdAt: a }) =>
            a > b ? 1 : a < b ? -1 : 0,
        );
        if (allComments == undefined) {
            res.status(400);
            throw new Error('Sản phẩm không tồn tại');
        } else {
            res.json(allComments);
        }
    }),
);

// GET ALL REVIEW ONLY ONE PRODUCT
productRoute.get(
    '/:id/onlyProduct/allReview',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id).populate('reviews.user', 'name image');
        const allReview = product?.reviews?.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
        if (allReview == undefined) {
            res.status(400);
            throw new Error('Sản phẩm không tồn tại');
        } else {
            res.json(allReview);
        }
    }),
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
    '/admin',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        let search = {};
        if (req.query.keyword) {
            search.name = {
                $regex: req.query.keyword,
                $options: 'i',
            };
        }
        if (req.query.category) {
            search.category = req.query.category;
        }
        const count = await Product.countDocuments({ ...search });
        const products = await Product.find({ ...search })
            .populate(`category`)
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 });
        res.json({ products, page, pages: Math.ceil(count / pageSize), countProducts: count });
    }),
);

// GET SINGLE PRODUCT
productRoute.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not Found');
        }
    }),
);

// PRODUCT REVIEW
productRoute.post(
    '/:id/review',
    protect,
    asyncHandler(async (req, res) => {
        const { rating, color, comment, name } = req.body;
        const product = await Product.findById(req.params.id);
        const order = await Order.find({ user: req.user._id });
        let listOrder = [];
        if (rating == '' || color == '' || comment == '') {
            res.status(400);
            throw new Error(`Nhập đầy đủ thông tin`);
        }
        if (order) {
            for (let i = 0; i < order.length; i++) {
                if (order[i].isPaid == true) {
                    listOrder = [...listOrder, ...order[i].orderItems];
                }
            }
            if (listOrder.filter((i) => i.product == req.params.id).length == 0) {
                res.status(400);
                throw new Error(`Không thể đánh giá`);
            }
        }
        if (product) {
            const numOrderUser = listOrder.filter((i) => i.product == req.params.id).length;
            const alreadyReviewed = product.reviews.filter((r) => r.user.toString() === req.user._id.toString()).length;
            if (alreadyReviewed >= numOrderUser) {
                res.status(400);
                throw new Error('Sản phẩm đã được đánh giá');
            }
            const review = {
                name: name,
                rating: Number(rating),
                color,
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Reviewed Added' });
        } else {
            res.status(404);
            throw new Error('Product not Found');
        }
    }),
);

// PRODUCT COMMENT
productRoute.post(
    '/:id/comment',
    protect,
    asyncHandler(async (req, res) => {
        const { nameProduct, imageProduct, question } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const comment = {
                name: req.user.name,
                nameProduct,
                imageProduct,
                idProduct: req.params.id,
                question,
                user: req.user._id,
            };
            product.comments.push(comment);
            product.numComments = product.comments.length;

            await product.save();
            res.status(201).json({ message: 'Comment Add Success' });
        } else {
            res.status(404);
            throw new Error('Product not Found');
        }
    }),
);

// PRODUCT COMMENTCHILDS
productRoute.post(
    '/:id/commentchild',
    protect,
    asyncHandler(async (req, res) => {
        const { questionChild, idComment } = req.body;
        const product = await Product.findById(req.params.id);
        const commentUsers = product.comments;
        const findComment = commentUsers.find((commentUser) => commentUser._id == idComment);
        if (product) {
            const commentChild = {
                name: req.user.name,
                questionChild,
                user: req.user._id,
            };
            findComment.commentChilds.push(commentChild);

            await product.save();
            res.status(201).json({ message: 'CommentChild Add Success' });
        } else {
            res.status(404);
            throw new Error('Product not Found');
        }
    }),
);

// DELETE PRODUCT
productRoute.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        const listImage = product?.image;
        if (listImage) {
            for (let i = 0; i < listImage.length; i++) {
                fs.unlink(path.join(__dirname, 'public/productImage', listImage[i].image), (err) => {
                    if (err) console.log('Delete old productImage have err:', err);
                });
            }
        }
        if (product) {
            await Cart.updateMany({}, { $pull: { cartItems: { product: req.params.id } } });
            await product.remove();
            res.json({ message: 'Product deleted' });
            // res.json(newCart);
        } else {
            res.status(404);
            throw new Error('Product not Found');
        }
    }),
);

// DELETE PRODUCT OPTION COLOR AND AMOUNT
productRoute.post(
    '/:id/delete',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { optionId } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            product.optionColor = product?.optionColor.filter((option) => option._id != optionId);
            await product.save();
            res.json({ message: 'Đã xóa thành công' });
        } else {
            res.status(404);
            throw new Error('Không có thông tin');
        }
    }),
);

// CREATE PRODUCT
productRoute.post(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, price, description, category, image } = req.body;
        const productExist = await Product.findOne({ name });
        if (price <= 0) {
            res.status(400);
            throw new Error('Price is not valid, please correct it and try again');
        }
        if (productExist) {
            res.status(400);
            throw new Error('Product name already exist');
        } else {
            const product = new Product({
                name,
                price,
                description,
                category,
                image,
                user: req.user._id,
            });
            if (product) {
                const createdproduct = await product.save();
                res.status(201).json(createdproduct);
            } else {
                res.status(400);
                throw new Error('Invalid product data');
            }
        }
    }),
);

//CREATE COLOR
productRoute.post(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { color, countInStock } = req.body;
        const product = await Product.findById(req.params.id);
        const optionColors = product.optionColor;
        const colorExist = optionColors.some((optionColor) => optionColor.color == color);

        if (countInStock <= 0) {
            res.status(400);
            throw new Error('countInStock is not valid, please correct it and try again');
        }
        if (colorExist) {
            res.status(400);
            throw new Error('Product color already exist');
        }
        if (product) {
            const colors = {
                color,
                countInStock,
            };
            optionColors.push(colors);
            await product.save();
            res.status(201).json(optionColors);
        } else {
            res.status(400);
            throw new Error('Invalid product data');
        }
    }),
);

// UPDATE PRODUCT
productRoute.put(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, price, description, category, image } = req.body;
        const product = await Product.findById(req.params.id);
        if (price <= 0) {
            res.status(400);
            throw new Error('Price or Count in stock is not valid, please correct it and try again');
        }
        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.image = image || product.image;
            // product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }),
);

// UPDATE OPTION COLOR AND AMOUNT PRODUCT
productRoute.put(
    '/:id/option',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { optionId, color, countInStock } = req.body;
        const product = await Product.findById(req.params.id);
        const findOption = product.optionColor?.find((option) => option._id == optionId);
        const findColor = product.optionColor?.find((option) => option.color == color);
        if (countInStock <= 0) {
            res.status(400);
            throw new Error('Vui lòng nhập lại số lượng');
        }
        if (findOption.color != findColor?.color) {
            if (color == findColor?.color) {
                res.status(400);
                throw new Error('Màu sắc đã trùng');
            }
        }
        if (findOption) {
            findOption.color = color || findOption.color;
            findOption.countInStock = countInStock || findOption.countInStock;

            await product.save();
            res.json(findOption);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }),
);

// DELETE IMAGE PRODUCT
productRoute.post(
    '/:id/deleteImage',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { imageId } = req.body;
        const product = await Product.findById(req.params.id);
        const listImage = product?.image;
        const finDelete = listImage.find((image) => image.id == imageId);
        if (finDelete) {
            fs.unlink(path.join(__dirname, 'public/productImage', finDelete.image), (err) => {
                if (err) console.log('Delete old productImage have err:', err);
            });
        }
        if (product) {
            const filterImage = listImage.filter((image) => image.id != imageId);
            product.image = filterImage;
            const newProduct = await product.save();
            res.status(201).json(newProduct);
        }
    }),
);

// DELETE COMMENTS PRODUCT
productRoute.post(
    '/:id/deleteComment',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { idComment } = req.body;
        const product = await Product.findById(req.params.id);
        const finDelete = product.comments.filter((comment) => comment._id != idComment);
        if (finDelete) {
            product.comments = finDelete;
            await product.save();
            res.status(201).json('success delete comment');
        }
    }),
);

//DELETE COMMENTS CHILD
productRoute.post(
    '/:id/deleteCommentChild',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { idComment, idCommentChild } = req.body;
        const product = await Product.findById(req.params.id);
        const findComment = product.comments.find((comment) => comment._id == idComment);
        if (findComment) {
            const findDelete = findComment.commentChilds.filter((commentChild) => commentChild._id != idCommentChild);
            if (findDelete) {
                findComment.commentChilds = findDelete;
                await product.save();
                res.status(201).json('success delete commentChild');
            }
        }
    }),
);

export default productRoute;
