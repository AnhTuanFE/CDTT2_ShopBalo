import express from 'express';
import multer from 'multer';
import path from 'path';
// import fs from 'fs';
// const __dirname = path.resolve();
const Upload = express.Router();
//Upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
// app.use(express.static('/public'));
Upload.post('/', async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage }).single('image');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        // if (!!user?.image && req.body.image !== user.image) {
        //     fs.unlink(path.join(__dirname, 'public', user.image), (err) => {
        //         if (err) console.log('Delete old avatar have err:', err);
        //     });
        // }
        res.send(req.file);
    });
});
export default Upload;
