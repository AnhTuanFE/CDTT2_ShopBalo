import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
const Category = mongoose.model('Category', categorySchema);
export default Category;
