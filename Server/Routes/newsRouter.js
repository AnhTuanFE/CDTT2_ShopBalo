import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../Middleware/AuthMiddleware.js';
import news from '../Models/NewsModel.js';

const newsRouter = express.Router();
//GET ALL NEWS
newsRouter.get('/', async (req, res) => {
    const News = await news.find({}).sort({ _id: -1 });
    res.json(News);
});

//GET NEWS
newsRouter.get('/:id', async (req, res) => {
    const News = await news.findById(req.params.id);
    const Allnews = await news.find({});
    const getNews = Allnews.find((news) => news.content == News.content);
    res.json(getNews);
});

//DELETE NEWS
newsRouter.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const News = await news.findById(req.params.id);
        const ListNews = await news.find({});
        if (ListNews.length <= 1) {
            res.status(404);
            throw new Error('Can delete news');
        }
        if (News) {
            await News.remove();
            res.json({ message: 'news deleted' });
        } else {
            res.status(404);
            throw new Error('news not Found');
        }
    }),
);

//CREATE NEWS
newsRouter.post(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { nameUser, title, image, content } = req.body;
        if (nameUser == '') {
            res.status(400);
            throw new Error('Vui lòng nhập đầy đủ thông tin');
        }
        if (title == '') {
            res.status(400);
            throw new Error('Vui lòng nhập đầy đủ thông tin');
        }
        if (image == '') {
            res.status(400);
            throw new Error('Vui lòng nhập đầy đủ thông tin');
        }
        if (content == '') {
            res.status(400);
            throw new Error('Vui lòng nhập đầy đủ thông tin');
        }
        const News = new news({
            nameUser,
            title,
            image,
            content,
        });
        if (News) {
            const createdNews = await News.save();
            res.status(201).json(createdNews);
        } else {
            res.status(400);
            throw new Error("Can't add news");
        }
    }),
);

//PUT UPDATE NEWS
newsRouter.put(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { nameUser, title, image, content } = req.body;
        const News = await news.findById(req.params.id);
        if (News) {
            News.nameUser = nameUser || News.nameUser;
            News.title = title || News.title;
            News.image = image || News.image;
            News.content = content || News.content;

            const updateNews = await News.save();
            res.json(updateNews);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }),
);
export default newsRouter;
