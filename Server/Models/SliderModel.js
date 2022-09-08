import mongoose from "mongoose";

const sliderSchema =mongoose.Schema(
    {
        url: {
            type:String,
            require:true
        }
    }
)
const slider = mongoose.model('slider',sliderSchema)
export default slider