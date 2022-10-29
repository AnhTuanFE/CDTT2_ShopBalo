import mongoose from 'mongoose';
const cartItem = mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        color: { type: String, required: true },
        qty: { type: Number, required: true },
        isBuy: {
            type: Boolean,
            require: true,
            default: false,
        },
        // isCheck: {
        //     type: Boolean,
        //     require: true,
        //     default: false,
        // },
    },
    {
        timestamps: true,
    },
);
const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    cartItems: [cartItem],
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
