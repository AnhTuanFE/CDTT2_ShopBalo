import mongoose from 'mongoose';

const avatarSchema = mongoose.Schema({
    url: {
        type: String,
        require: true,
    },
});
const avatar = mongoose.model('avatar', avatarSchema);
export default avatar;
