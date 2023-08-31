import mongoose, { Mongoose ,Schema, model } from "mongoose";


const userSchema = new Schema({

    name: { type: String,
        required: true,
    },
    email: { type: String,
        required: true,
        unique: true,    
    },
    password: { type: String,
        required: true,
        minLength: 6,
    },
    posts: [
        {type: mongoose.Types.ObjectId, ref: "postModel"}
    ],
}); 

export default mongoose.model("userModel", userSchema);