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
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, phone } =
            req.body;

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
        const orders = await Order.find({}).sort({ _id: -1 }).populate('user', 'id name email');
        res.json(orders);
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
            order.deliveredAt = Date.now();

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
