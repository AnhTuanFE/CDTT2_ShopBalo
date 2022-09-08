import express from 'express';
import Category from './../Models/CategoryModel.js';
import { admin, protect } from './../Middleware/AuthMiddleware.js';
import asyncHandler from 'express-async-handler';
import Product from '../Models/ProductModel.js';
const CategoryRouter = express.Router();

CategoryRouter.get(
    '/',
    // protect,
    asyncHandler(async (req, res) => {
        const categories = await Category.find({}).sort({ _id: -1 });
        if (categories) {
            res.json(categories);
        } else {
            res.status(404);
            throw new Error('Category not Found');
        }
    }),
);
CategoryRouter.delete(
    '/:id',
    // admin,
    // protect,
    asyncHandler(async (req, res) => {
        const categories = await Category.findById(req.params.id);
        if (categories) {
            const cateInProduct = await Product.findOne({ category: categories._id });
            if (cateInProduct) {
                res.status(404);
                throw new Error('Exit products of category');
            }
            await categories.remove();
            res.json({ message: 'Category deleted' });
        } else {
            res.status(404);
            throw new Error('Can delete category');
        }
    }),
);
export default CategoryRouter;

CategoryRouter.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const { name, description } = req.body;
        const category = await Category.findOne({ name: name.trim() });

        if (category) {
            res.status(404);
            throw new Error('This category already exists');
        }

        const newCategory = new Category({
            name: name.trim(),
            // image: image.trim(),
            description: description.trim(),
        });
        await newCategory.save();
        res.status(201).json({ message: 'Category Added' });
    }),
);
CategoryRouter.put(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const { idCategory, name, description } = req.body;
        const exitCategory = await Category.findOne({ name: name.trim() });
        const oldCategory = await Category.findById(idCategory.trim());
        if (
            oldCategory.name === name.trim() &&
            // oldCategory.image === image.trim() &&
            oldCategory.description === description.trim()
        ) {
            res.status(404);
            throw new Error('No thing to update');
        }
        if (exitCategory && exitCategory.name != oldCategory.name) {
            res.status(404);
            throw new Error('Category already exists');
        }
        if (oldCategory) {
            oldCategory.name = name || oldCategory.name;
            // oldCategory.image = image || oldCategory.image;
            oldCategory.description = description || oldCategory.description;
            const updateCategory = await oldCategory.save();

            res.json(updateCategory);
        } else {
            res.status(404);
            throw new Error('Update category fail');
        }
    }),
);
