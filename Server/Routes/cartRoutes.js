import express from 'express';

import Cart from '../Models/CartModel.js';
import Product from '../Models/ProductModel.js';
import { admin, protect } from './../Middleware/AuthMiddleware.js';
import asyncHandler from 'express-async-handler';
const cartRoutes = express.Router();

cartRoutes.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const cart = await Cart.findOne({ user: req.params.id }).populate('cartItems.product');
        // .select('"name" "image" "price" "qty" "countInStock" "description"');
        if (cart) {
            res.json(cart.cartItems);
        } else {
            res.json([]);
        }
    }),
);

cartRoutes.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const { productId, qty, _id } = req.body;
        const product = await Product.findById(productId);
        const cartExist = await Cart.findOne({ user: _id });
        if (cartExist) {
            //update
            const productExit = cartExist?.cartItems?.find((value) => value.product == productId);
            if (productExit) {
                const newArray = cartExist?.cartItems;
                for (let i = 0; i <= newArray.length - 1; i++) {
                    if (newArray[i].product == productId && typeof qty != 'boolean') {
                        newArray[i].qty = qty;
                    }
                    if (newArray[i].product == productId && typeof qty == 'boolean') {
                        newArray[i].isBuy = !newArray[i]?.isBuy;
                    }
                }
                cartExist.cartItems = newArray;
                await cartExist.save();

                res.status(201).json('success');
                return;
            }
            const cartadd = {
                product: productId,
                // name: product.name,
                // image: product.image,
                // price: product.price,
                qty: qty,
                // countInStock: product.countInStock,
            };
            cartExist.cartItems.push(cartadd);
            await cartExist.save();
            const cartCurrent = cartExist.cartItems;
            res.status(201).json(cartCurrent);
            return;
        } else {
            const newCart = new Cart({
                user: _id,
                cartItems: [
                    {
                        product: productId,
                        // name: product.name,
                        // image: product.image,
                        // price: product.price,
                        qty,
                        // countInStock: product.countInStock,
                    },
                ],
            });
            const createCart = await newCart.save();
            res.status(201).json(createCart.cartItems);

            return;
        }
    }),
);

cartRoutes.post(
    '/delete',
    // protect,
    asyncHandler(async (req, res) => {
        const { user, pr } = req.body;
        // const user = req.query.us
        // const pr = req.params.pr
        const cartExist = await Cart.findOne({ user: user });

        if (cartExist) {
            //update
            const newArray = cartExist.cartItems;
            const productExit = newArray.find((value) => value.product == pr);
            if (!productExit) {
                res.status(404);
                throw new Error('Product not found');
            }
            cartExist.cartItems = newArray.filter((value) => value.product != pr);
            await cartExist.save();
            res.status(201).json('Success');
        } else {
            res.status(404);
            throw new Error(`user:${user} , pr: ${pr}`);
        }
    }),
);

cartRoutes.delete(
    '/:id',
    protect,
    // admin,
    asyncHandler(async (req, res) => {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            await Cart.updateMany({ user: req.user._id }, { $pull: { cartItems: { isBuy: true } } });
            // await cart.save();
            res.json({ message: 'Cart clear' });
        } else {
            res.status(404);
            throw new Error('Can not clear this cart');
        }
    }),
);
export default cartRoutes;
