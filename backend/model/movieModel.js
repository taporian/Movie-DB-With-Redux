import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    year: {
        type: Number,
        min:1000, 
        max:9999,
        required: true,
    },
    rating: {
        type: Number,
        min:1,
        max:10,
        required: true,
        default: 4,
       
    },
    description: {
        type:String,
        required: true,
    }
});

export default mongoose.model("Movie", movieSchema);