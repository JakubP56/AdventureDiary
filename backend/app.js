console.log(" app running ")

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/UserRouters";
import postRouter from "./routes/postRouter";
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter)
app.use("/posts", postRouter)

//app.use("/",(req,res,next)=> {
  //  return res.send("Hello")
//})

//mongoDB connection
mongoose
    .connect(`mongodb+srv://jprochnicki56:${process.env.MONGODB_PASS}@cluster0.mitlhey.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() =>
    app.listen(5000, () => console.log("Mongo DB Connected: Listening on port 5000"))
    )
    .catch((err) =>console.log(errr));
    
