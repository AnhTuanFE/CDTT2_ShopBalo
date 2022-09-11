import express from 'express';
import asyncHandler from 'express-async-handler';
import avatar from '../Models/AvatarModel.js';
import { admin, protect } from './../Middleware/AuthMiddleware.js';

const avatarRouter = express.Router();
avatarRouter.get('/', async (req, res) => {
    const Avatar = await avatar.find({}).sort({ _id: -1 });
    res.json(Avatar);
});

avatarRouter.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const Avatar = await avatar.findById(req.params.id);
        const ListAvatar = await avatar.find({});
        if (ListAvatar.length <= 1) {
            res.status(404);
            throw new Error('Can delete avatar');
        }
        if (Avatar) {
            await Avatar.remove();
            res.json({ message: 'avatar deleted' });
        } else {
            res.status(404);
            throw new Error('avatar not Found');
        }
    }),
);
export default avatarRouter;

avatarRouter.post(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { url, id } = req.body;
        //add slider
        if (!id) {
            const avatarExist = await avatar.findOne({ url: url.trim() });
            if (url.trim() === '') {
                res.status(400);
                throw new Error('Please enter avatar');
            }
            if (avatarExist) {
                res.status(400);
                throw new Error('Avatar url already exist');
            } else {
                const Avatar = new avatar({
                    url,
                    // user: req.user._id,
                });
                if (Avatar) {
                    const createdAvatar = await Avatar.save();
                    res.status(201).json(createdAvatar);
                } else {
                    res.status(400);
                    throw new Error("Can't add avatar");
                }
            }
        } else {
            const avatarNew = await avatar.findById(id);
            const avatarExist = await avatar.findOne({ url: url.trim() });
            if (avatarNew.url === url) {
                res.status(400);
                throw new Error('No thing to update');
            }
            if (avatarExist && avatarExist._id !== id) {
                res.status(400);
                throw new Error('Avatar url already exist');
                return;
            }
            if (avatarNew) {
                avatarNew.url = url.trim();
                await avatarNew.save();
                res.status(201).json();
            }
        }
    }),
);
