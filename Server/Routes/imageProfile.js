import express from 'express';
import multer from 'multer';
import path from 'path';

const imageProfile = express.Router();
//Upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/productImage');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
// app.use(express.static('/public'));
imageProfile.post('/', async (req, res) => {
    let inputImage = multer({ storage: storage }).array('image');
    inputImage(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.files) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        res.send(req.files);
    });
});
export default imageProfile;
