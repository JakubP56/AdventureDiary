import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    
    user: {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
        required:true,
    },
});

export default mongoose.model("postModel", postSchema);