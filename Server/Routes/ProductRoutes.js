import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from './../Models/ProductModel.js';
import { admin, protect } from './../Middleware/AuthMiddleware.js';
import Category from '../Models/CategoryModel.js';
import Order from './../Models/OrderModel.js';
import Cart from '../Models/CartModel.js';
const productRoute = express.Router();

// GET PRODUCT
productRoute.get(
    '/',
    asyncHandler(async (req, res) => {
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1;
        const rating = Number(req.query.rating) || 0;
        const maxPrice = Number(req.query.maxPrice) || 0;
        const minPrice = Number(req.query.minPrice) || 0;
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

        // const orders = await Order.find({});
        // products.map((product) => {
        //     let count = 0;
        //     orders.map((order) => {
        //         order.orderItems.map((item) => {
        //             if (product.name == item.nam) {
        //                 count += item.qty;
        //             }
        //         });
        //     });
        //     product.numberOfOrders = count;
        // });
        // if (sortProducts == 2) {
        // for (let product of products) {
        //     let count = 0;
        //     for (let order of orders) {
        //         for (let item of order.orderItems) {
        //             if (product._id === item.product) {
        //                 count += item.qty;
        //             }
        //         }
        //     }
        //     product.numberOfOrders = count;
        // }
        // products.sort(function (a, b) {
        //     return b.numberOfOrders - a.numberOfOrders;
        // });
        // }
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
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);
        const order = await Order.find({ user: req.user._id });
        if (order) {
            let listOrder = [];
            for (let i = 0; i < order.length; i++) {
                if (order[i].isPaid == true) {
                    listOrder = [...listOrder, ...order[i].orderItems];
                }
            }
            if (listOrder.filter((i) => i.product == req.params.id).length == 0) {
                res.status(400);
                // res.status(400).json(order);
                throw new Error(`Can not review`);
            }
        }
        if (product) {
            const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Product already Reviewed');
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
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

// DELETE PRODUCT
productRoute.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        // const cart = await Cart.find({ 'cartItems.product': req.params.id });

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

// CREATE PRODUCT
productRoute.post(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, price, description, category, image, countInStock } = req.body;
        const productExist = await Product.findOne({ name });
        if (price <= 0 || countInStock < 0 || price >= 10000 || countInStock >= 10000) {
            res.status(400);
            throw new Error('Price or Count in stock is not valid, please correct it and try again');
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
                countInStock,
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

// UPDATE PRODUCT
productRoute.put(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, price, description, category, image, countInStock } = req.body;
        const product = await Product.findById(req.params.id);
        if (price <= 0 || countInStock < 0 || price >= 10000 || countInStock >= 10000) {
            res.status(400);
            throw new Error('Price or Count in stock is not valid, please correct it and try again');
        }
        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.image = image || product.image;
            product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }),
);
export default productRoute;
