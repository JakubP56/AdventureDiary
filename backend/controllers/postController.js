import mongoose, { startSession } from "mongoose";
import postModel from "../models/postModel";
import userModel from "../models/userModel";

export const getAllPosts = async(req,res) =>
{
    let posts;
    try{
        posts = await postModel.find();
    }
    catch(err)
    {
        return console.log(err);
    }

    if(!posts){
        return res.status(500).json({message: "Unexpected Error Occurred" });
    }

    return res.status(200).json({posts});
};

export const addPost = async(req,res) => {
    const {title, description, location, date, image,user} = req.body;

    //validations
    if(!title && title.trim()==="" &&
        !description && 
        description.trim()==="" &&
        !location && location.trim()===""  && !user && !image && image.trim()==="")
        {
            return res.status(422).json({message: "Invalid Data"});
        }

        let existingUser;
        try{
            existingUser = await userModel.findById(user);
        }
        catch(err)
        {
            return console.log(err);
        }

        if(!existingUser){
            return res.status(404).json({message: "User not Found"});
        }

        let post;

        try{
            //new instance of post model
            post = new postModel({title,description,image,location,date: new Date(`${date}`),user,});
            
            const session = await mongoose.startSession();
            session.startTransaction();
            existingUser.posts.push(post);
            await existingUser.save({session});
            post = await post.save({session});
            session.commitTransaction();
        }
        catch(err){
            return console.log(err);
        }

        if (!post) {
            return res.status(500).json({message: "Unexpected Error Occured"});
        }
        return res.status(201).json({post})
};

export const getPostById = async(req,res) => {
    const id = req.params.id;

    let post;

    try{
        post = await postModel.findById(id);
    }
    catch(err){
        return console.log(err);
    }

    if(!post)
    {
        return res.status(404).json({message: "No Post Found"});
    }

    res.status(200).json({post});
};

export const updatePost = async(req,res) => {
    const id = req.params.id;
    const {title, description, location, image} = req.body;

    //validations
    if(!title && title.trim()==="" &&
        !description && 
        description.trim()==="" &&
        !location && location.trim()==="" &&
        !image && image.trim()==="")
        {
            return res.status(422).json({message: "Invalid Data"});
        }
    
    let post;
    try{
        post = await postModel.findByIdAndUpdate(id,{
            title,description,image,location,
        });
    }
    catch(err){
        return console.log(err);
    }

    if(!post){
        return res.status(500).json({ message: "Unable to update"});
    }
    
    return res.status(200).json({message:"Updated Succesfully"});
};

export const deletePost = async(req,res) => {
    const id= req.params.id;

    let post;

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        post = await postModel.findById(id).populate("user");
        post.user.posts.pull(post);
        await post.user.save({session});
        post = await postModel.findByIdAndRemove(id);
        session.commitTransaction();
    }
    catch(err)
    {
        return console.log(err);
    }
    if(!post){
        return res.status(500).json({message: "Unable to Delete"});
    }

    return res.status(200).json({message: "Deleted Successfully"});
};