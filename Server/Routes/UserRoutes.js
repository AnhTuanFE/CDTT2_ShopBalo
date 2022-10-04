import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { protect, admin } from '../Middleware/AuthMiddleware.js';
import generateToken from '../utils/generateToken.js';
import User from './../Models/UserModel.js';
import path from 'path';
import fs from 'fs';
// forgot email
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
// import ForgotPassword from '../../user/src/components/profileComponents/ForgotPassword.js';
// var nodemailer = require("nodemailer");

const __dirname = path.resolve();
const userRouter = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const JWT_SECRET1 = 'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';

// LOGIN
userRouter.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

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
    '/profile',
    protect,
    asyncHandler(async (req, res) => {
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

        if (!!user?.image && req.body.image !== user.image) {
            fs.unlink(path.join(__dirname, 'public', user.image), (err) => {
                if (err) console.log('Delete old avatar have err:', err);
            });
        }
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
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
                //image: newImage === undefined ? user.image : newImage,
                image: user.image,
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

//forgot password ==========================================================================================

userRouter.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: 'User Not Exists!!' });
        }
        const secret = JWT_SECRET1 + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: '5m',
        });
        const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
        // var transporter = nodemailer.createTransport({
        //   service: "gmail",
        //   auth: {
        //     user: "tuandgtl7@gmail.com",
        //     pass: "byyvdrcfifstgrph",
        //   },
        // });

        // var mailOptions = {
        //   from: "tuandgtl7@gmail.com",
        //   to: "tuandgtl8@gmail.com",
        //   subject: "Password Reset",
        //   text: link,
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log("Email sent: " + info.response);
        //   }
        // });
        console.log(link);
    } catch (error) {}
});

// userRouter.get("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   console.log(req.params);
//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET1 + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     res.render("index", { email: verify.email, status: "Not Verified" });
//   } catch (error) {
//     console.log(error);
//     res.send("Not Verified");
//   }
// });
userRouter.get('/reset-password', async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    // const oldUser = await User.findOne({ _id: id });
    // if (!oldUser) {
    //   return res.json({ status: "User Not Exists!!" });
    // }
    // const secret = JWT_SECRET1 + oldUser.password;
    // try {
    //   const verify = jwt.verify(token, secret);
    //   res.render("index", { email: verify.email, status: "Not Verified" });
    // } catch (error) {
    //   console.log(error);
    //   res.send("Not Verified");
    // }
});

userRouter.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: 'User Not Exists!!' });
    }
    const secret = JWT_SECRET1 + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            },
        );

        res.render('index', { email: verify.email, status: 'verified' });
    } catch (error) {
        console.log(error);
        res.json({ status: 'Something Went Wrong' });
    }
});

export default userRouter;
