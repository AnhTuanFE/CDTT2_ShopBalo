import express from "express";
import User from "./Models/UserModel.js";
import users from "./data/users.js";
import Product from "./Models/ProductModel.js";
import products from "./data/Products.js";
import asyncHandler from "express-async-handler";
import Slider from "./Models/SliderModel.js";
import {slider} from "./data/slider.js";
const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
  })
);
ImportData.post(
  "/slider",
  asyncHandler(async (req, res) => {
    await Slider.remove({});
    const importSlider = await Slider.insertMany(slider);
    res.send({ importSlider });
  })
);

export default ImportData;
