import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { protect, admin } from '../Middleware/AuthMiddleware.js';
import generateToken from '../utils/generateToken.js';
import User from './../Models/UserModel.js';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const userRouter = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/userProfile');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// LOGIN
userRouter.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user?.disabled) {
            res.status(400);
            throw new Error('Tài khoản đã bạn đã bị khóa, vui lòng liên hệ shop để có thể lấy lại');
        }
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
                address: user.address,
                city: user.city,
                country: user.country,
                image: user.image,
                disabled: user.disabled,
            });
        } else {
            res.status(401);
            throw new Error('Invalid Email or Password');
        }
    }),
);

// REGISTER
userRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const { name, email, phone, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            phone,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                address: user.address,
                city: user.city,
                country: user.country,
                image: user.image,
                disabled: user.disabled,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid User Data');
        }
    }),
);

// PROFILE
userRouter.get(
    '/user',
    protect,
    asyncHandler(async (req, res) => {
        // console.log('req.user = ', req.user);
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
                address: user.address,
                city: user.city,
                country: user.country,
                image: user.image,
                disabled: user.disabled,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }),
);

// UPDATE PROFILE
userRouter.put(
    '/profile',
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (user?.disabled) {
            res.status(400);
            throw new Error('account lock up');
        }
        if (!!user?.image && req.body.image !== user.image) {
            fs.unlink(path.join(__dirname, 'public/userProfile', user.image), (err) => {
                if (err) console.log('Delete old avatar have err:', err);
            });
        }
        // user.email = req.body.email || user.email;
        if (user) {
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;
            user.city = req.body.city || user.city;
            user.country = req.body.country || user.country;
            //user.image = newImage === undefined ? user.image : newImage;
            user.image = req.body.image || user.image;

            if (req.body.password) {
                if (await user.matchPassword(req.body.oldPassword)) {
                    user.password = req.body.password;
                } else {
                    res.status(404);
                    throw new Error('Old Password is not correct!');
                }
            }
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                isAdmin: updatedUser.isAdmin,
                createdAt: updatedUser.createdAt,
                token: generateToken(updatedUser._id),
                address: user.address,
                city: user.city,
                country: user.country,
                image: user.image,
                disabled: user.disabled,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }),
);

// GET ALL USER ADMIN
userRouter.get(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const users = await User.find({});
        res.json(users);
    }),
);

// GET ALL USER
userRouter.get(
    '/all',
    asyncHandler(async (req, res) => {
        let allUser = [];
        const users = await User.find({});
        for (let i = 0; i < users.length; i++) {
            allUser.push({ _id: users[i]._id, image: users[i].image });
        }
        res.json(allUser);
    }),
);

// PUT DISPAD USER
userRouter.put(
    '/:id/disabled',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { disabled } = req.body;
        const user = await User.findById(req.params.id);
        if (user.isAdmin) {
            res.status(400);
            throw new Error('error');
        }
        if (disabled == user.disabled) {
            if (disabled == true) {
                res.status(400);
                throw new Error(disabled);
            } else {
                res.status(400);
                throw new Error(disabled);
            }
        }
        if (user) {
            user.disabled = disabled;
            const retult = await user.save();
            res.status(201).json(retult);
        }
    }),
);

export default userRouter;
