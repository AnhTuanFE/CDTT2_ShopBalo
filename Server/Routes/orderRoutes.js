import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../Middleware/AuthMiddleware.js';
import Product from '../Models/ProductModel.js';
import Order from './../Models/OrderModel.js';

const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            phone,
            name,
            email,
        } = req.body;

        if (req?.user?.disabled) {
            res.status(400);
            throw new Error('account look up');
        }
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
            return;
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                phone,
                name,
                email,
            });
            for (let i = 0; i < orderItems.length; i++) {
                const findProduct = await Product.findById(orderItems[i].product);
                const optionColor = findProduct?.optionColor;
                const findColor = optionColor.find((option) => option.color == orderItems[i].color);
                const filterOptionColor = optionColor.filter((option) => option.color != orderItems[i].color);
                if (findColor) {
                    findColor.color = findColor.color;
                    findColor.countInStock = findColor.countInStock - orderItems[i].qty;
                }
                let arrOption = [...filterOptionColor, findColor];
                await Product.findOneAndUpdate({ _id: orderItems[i].product }, { optionColor: arrOption });
            }
            const createOrder = await order.save();
            res.status(201).json(createOrder);
        }
    }),
);

//UPDATE AMOUNT PRODUCT
orderRouter.put(
    '/returnAmountProduct',
    protect,
    asyncHandler(async (req, res) => {
        const { orderItems } = req.body;
        if (orderItems) {
            for (let i = 0; i < orderItems.length; i++) {
                const findProduct = await Product.findById(orderItems[i].product);
                const optionColor = findProduct?.optionColor;
                const findColor = optionColor.find((option) => option.color == orderItems[i].color);
                const filterOptionColor = optionColor.filter((option) => option.color != orderItems[i].color);
                if (findColor) {
                    findColor.color = findColor.color;
                    findColor.countInStock = findColor.countInStock + orderItems[i].qty;
                }
                let arrOption = [...filterOptionColor, findColor];
                await Product.findOneAndUpdate({ _id: orderItems[i].product }, { optionColor: arrOption });
            }
            res.status(201).json('success');
        }
    }),
);

//CREATE PRODUCT
orderRouter.post(
    '/:id/poductReview',
    protect,
    asyncHandler(async (req, res) => {
        const { orderItemId, rating, comment, name } = req.body;
        const orders = await Order.find({ user: req.user._id });
        const order = orders.find((order) => order.id == req.params.id);
        const findItemProduct = order?.orderItems.find((item) => item._id == orderItemId);
        if (findItemProduct?.productReview.length > 0) {
            res.status(400);
            throw new Error('Bạn đã đánh giá rồi');
        }
        if (rating == '' || comment == '') {
            res.status(400);
            throw new Error('Nhập đầy đủ thông tin');
        }
        if (findItemProduct) {
            const newReview = {
                userName: name,
                rating,
                comment,
            };
            findItemProduct.productReview.push(newReview);
            await order.save();
            res.status(201).json(findItemProduct);
        }
    }),
);

// GET ALL ORDERS
orderRouter.get(
    '/productbestseller',
    //protect,
    asyncHandler(async (req, res) => {
        const orders = await Order.find({});
        const products = await Product.find({}).sort({ _id: -1 });
        let allPay = [];
        let AllOrder = [];
        let Arr = {};
        let ArrQuatity = [];
        for (let order of orders) {
            if (order.isPaid == true) {
                allPay.push(order);
            }
        }
        for (let pay of allPay) {
            for (let paid of pay.orderItems) {
                AllOrder.push(paid);
            }
        }
        for (let i = 0; i < AllOrder.length; i++) {
            if (Arr[AllOrder[i].product] != undefined) Arr[AllOrder[i].product]++;
            else Arr[AllOrder[i].product] = 1;
        }
        let newarr = [];
        ArrQuatity = Object.entries(Arr).sort(function (a, b) {
            return b[1] - a[1];
        });
        for (let i = 0; i < ArrQuatity.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (ArrQuatity[i][0] == products[j]._id) {
                    newarr.push(products[j]);
                    break;
                }
            }
        }
        res.json(newarr);
    }),
);

// ADMIN GET ALL ORDERS
orderRouter.get(
    '/all',
    // protect,
    // admin,
    asyncHandler(async (req, res) => {
        const pageSize = 15;
        const page = Number(req.query.pageNumber) || 1;
        const status = Number(req.query.status) || 0;

        let search = {};
        if (req.query.keyword) {
            search.email = {
                $regex: req.query.keyword,
                $options: 'i',
            };
        }
        if (status == 0) {
            search.cancel = 0;
        }
        if (status == 1) {
            search.waitConfirmation = false;
            search.cancel = 0;
        }
        if (status == 2) {
            search.cancel = 0;
            search.waitConfirmation = true;
            search.isDelivered = false;
        }
        if (status == 3) {
            search.cancel = 0;
            search.isDelivered = true;
            search.isPaid = false;
        }
        if (status == 4) {
            search.cancel = 0;
            search.isPaid = true;
            search.completeAdmin = false;
        }
        if (status == 5) {
            search.cancel = 0;
            search.completeUser = true;
            search.completeAdmin = true;
        }
        if (status == 6) {
            search.cancel = 1;
        }
        const count = await Order.countDocuments({ ...search });
        let orders = await Order.find({ ...search })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ _id: -1 })
            .populate('user', 'id name email');

        res.json({ orders, page, pages: Math.ceil(count / pageSize) });
    }),
);

orderRouter.get(
    '/complete',
    // protect,
    // admin,
    asyncHandler(async (req, res) => {
        const orders = await Order.find({ completeAdmin: true }).sort({ _id: -1 });
        if (orders) {
            res.json(orders);
        }
    }),
);

// USER GET ORDERS ITEMS
orderRouter.get(
    '/:id/orderItem',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            const orderItems = order?.orderItems;
            res.json(orderItems);
        }
    }),
);

// USER LOGIN ORDERS
orderRouter.get(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
        res.json(order);
    }),
);

// GET ORDER BY ID
orderRouter.get(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS PAID
orderRouter.put(
    '/:id/pay',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            // order.orderItems.map((orderItem)=>{
            // const product = await Product.findById(orderItem.product);
            // if(product){
            //     product.numberOfOrder += orderItem.qty;
            //     const updatedProduct = await Product.save();}
            // })
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS WAITCONFIRMATION
orderRouter.put(
    '/:id/waitConfirmation',
    // protect,
    // admin,
    asyncHandler(async (req, res) => {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            if (status) {
                order.waitConfirmation = true;
                order.waitConfirmationAt = Date.now();
            } else {
                order.waitConfirmation = false;
                order.waitConfirmationAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS COMMPLETE USER
orderRouter.put(
    '/:id/completeUser',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.completeUser = true;
            order.completeUserAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS COMMPLETE ADMIN
orderRouter.put(
    '/:id/completeAdmin',
    // protect,
    // admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.completeAdmin = true;
            order.completeAdminAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS DELIVERED
orderRouter.put(
    '/:id/delivered',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

orderRouter.put(
    '/:id/paid',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

orderRouter.delete(
    '/:id/cancel',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            if (order.isPaid != true) {
                order.cancel = 1;
                const updatedOrder = await order.save();
                res.json(updatedOrder);
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

orderRouter.delete(
    '/:id/ucancel',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (req?.user?.disabled) {
            res.status(400);
            throw new Error('account look up');
        }
        if (order != undefined || req.user._id == order.user) {
            if (order.isDelivered != true) {
                order.cancel = 1;
                const updatedOrder = await order.save();
                res.json(updatedOrder);
            } else {
                res.status(404);
                throw new Error('Can not cancel');
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);
orderRouter.get(
    '/:id/address',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.find({ user: req.params.id });

        if (order) {
            res.json(order[order.length - 1].shippingAddress);
        } else {
            res.status(404);
            throw new Error('Not found order of user');
        }
    }),
);

export default orderRouter;
