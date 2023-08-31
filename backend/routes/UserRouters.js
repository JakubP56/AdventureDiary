import { Router } from "express";
import { getUsers, login, signUp } from "../controllers/userController";

const userRouter= Router();

userRouter.get("/", getUsers);
userRouter.post("/signup",signUp);
userRouter.post("/login",login);

export default userRouter;
