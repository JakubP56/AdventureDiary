import { compareSync, hashSync } from "bcryptjs";
import User from "../models/userModel"


//getting all users from database
export const getUsers = async(req,res) => {
    let users;
    try{
        users = await User.find();
    }
    catch(err){
       return  console.log(err);
    }

    if(!users){
        return res.status(500).json({message: "Error"});
    }

    return res.status(200).json({users});
};

//creating a new user
export const signUp = async(req,res,next) => {
    //getting data from frontend
    const { name, email, password} = req.body;
    if(!name && name.trim() ==="" && !email && email.trim()==="" && !password && password.length <6)
    {
        return res.status(422).json({message:"Fields Must Not Be empty"});
    }

//hashing password so that password is not seen in database
const hashedPassword = hashSync(password);

//defining a new user
let user;
try{
    user = new User({email,name,password : hashedPassword});
    await user.save();
}
catch(err) {
    return console.log(err);
}

if(!user){
    return res.status(500).json({message:"Unexpected Error"});
}

return res.status(201).json({user})
}

export const login = async(req,res,next) => {

const {email, password} = req.body
if( !email && email.trim()==="" && !password && password.length <6)
{
    return res.status(422).json({message:"Fields Must Not Be empty"});
}

//checking if login matches existing User
let existingUser;
try { 
    //checking for existing user by email using findOne() method
    existingUser = await User.findOne({email});
}
catch(err){
    return console.log(err);
}
if(!existingUser) {
    return res.status(404).json({message: "no user found"});
}
//decrypt and validating password using compareSync() method from bcrypt
const isPassCorrect = compareSync(password,existingUser.password);

if(!isPassCorrect){
    return res.status(400).json({message: "Incorrect Password"});
}

return res.status(200).json({id: existingUser._id, message: "Login Successfull. Welcome Back!"});

};

export const getUserById = async(req,res) => {
    const id = req.params.id;

    let user;
    try{
        user = await User.findById(id).populate("posts");
    }
    catch(err){
        return console.log(err);
    }
    if(!user) {
        return res.status(404).json({message: "No User Found"});
    }
    return res.status(200).json({user});

}
