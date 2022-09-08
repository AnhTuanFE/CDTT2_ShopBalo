import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import SliderRouter from "./Routes/SliderRouter.js";
import cartRoutes from "./Routes/cartRoutes.js";
import categoryRoute from "./Routes/categoryRouter.js";
import multer from 'multer'
import path from 'path'
import Upload from "./Routes/Upload.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// API
app.use("/api/cart", cartRoutes)
app.use("/api/slider", SliderRouter)
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/category", categoryRoute)
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
app.use("/api/upload-profile-pic", Upload)

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
