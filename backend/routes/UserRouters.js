import { Router } from "express";
import { getUsers, login, signUp, getUserById } from "../controllers/userController";

const userRouter= Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signUp",signUp);
userRouter.post("/login",login);

export default userRouter;
