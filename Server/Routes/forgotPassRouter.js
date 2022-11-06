import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
// forgot email
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
// UserInFo
// import UserInFor from '../Models/userDetails.js';
import User from '../Models/UserModel.js'

import mongoose from 'mongoose';

const forgotPassRouter = express.Router();

const JWT_SECRET1 = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
// nhập mail, gửi link thay đổi mật khẩu
forgotPassRouter.post("/forgotPassword", async (req, res) => {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "Email chưa được đăng ký, vui lòng kiểm tra lại" });
      }
      const secret = JWT_SECRET1 + oldUser.password;
      const token1 = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "120m",
      });
      const link = `http://localhost:5000/api/forgotPass/reset-password/${oldUser._id}/${token1}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tuandgtl7@gmail.com",
          pass: "byyvdrcfifstgrph",
        },
      });
  
      var mailOptions = {
        from: "tuandgtl7@gmail.com",
        to: oldUser.email,
        subject: "Password Reset",
        text: link,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json({ status: "Link đặt lại mật khẩu đã được gửi qua email, vui lòng kiểm tra hòm thư của bạn" });
      console.log(link);
    } catch (error) {}
  });

//   gọi api thay đổi mật khẩu
  forgotPassRouter.get("/reset-password/:id/:token1", async (req, res) => {
    const { id, token1 } = req.params;
    // console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET1 + oldUser.password;
    try {
      const verify = jwt.verify(token1, secret);
      res.render("index", { email: verify.email, status: "Not verified" });
      // res.send("Verified");
    } catch (error) {
      console.log(error);
      res.send("not verified");
    }
  });
  forgotPassRouter.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
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
        }
      );
      // res.json({ status: "Password updated" });
      res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });

  export default forgotPassRouter;