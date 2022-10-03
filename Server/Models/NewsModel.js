import mongoose from 'mongoose';

const newsSchema = mongoose.Schema(
    {
        nameUser: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);
const news = mongoose.model('news', newsSchema);
export default news;
