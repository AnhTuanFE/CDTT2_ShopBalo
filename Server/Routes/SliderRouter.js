import express from 'express';
import slider from './../Models/SliderModel.js';
import asyncHandler from 'express-async-handler';
import { admin, protect } from './../Middleware/AuthMiddleware.js';

const SliderRouter = express.Router();
SliderRouter.get('/', async (req, res) => {
    const Slider = await slider.find({}).sort({ _id: -1 });
    res.json(Slider);
});

SliderRouter.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const Slider = await slider.findById(req.params.id);
        const ListSlider = await slider.find({});
        if (ListSlider.length <= 1) {
            res.status(404);
            throw new Error('Can delete slide');
        }
        if (Slider) {
            await Slider.remove();
            res.json({ message: 'Slide deleted' });
        } else {
            res.status(404);
            throw new Error('Slide not Found');
        }
    }),
);
export default SliderRouter;

SliderRouter.post(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { url, id } = req.body;
        //add slider
        if (!id) {
            const sliderExist = await slider.findOne({ url: url.trim() });
            if (url.trim() === '') {
                res.status(400);
                throw new Error('Please enter slide');
            }
            if (sliderExist) {
                res.status(400);
                throw new Error('Slider url already exist');
            } else {
                const Slider = new slider({
                    url,
                    // user: req.user._id,
                });
                if (Slider) {
                    const createdSlider = await Slider.save();
                    res.status(201).json(createdSlider);
                } else {
                    res.status(400);
                    throw new Error("Can't add slide");
                }
            }
        } else {
            const sliderNew = await slider.findById(id);
            const sliderExist = await slider.findOne({ url: url.trim() });
            if (sliderNew.url === url) {
                res.status(400);
                throw new Error('No thing to update');
            }
            if (sliderExist && sliderExist._id !== id) {
                res.status(400);
                throw new Error('Slider url already exist');
                return;
            }
            if (sliderNew) {
                sliderNew.url = url.trim();
                await sliderNew.save();
                res.status(201).json();
            }
        }
    }),
);
