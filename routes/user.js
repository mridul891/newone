import express from "express";
import {
  signinController,
  singupController,
  uniqueidController,
} from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.use("/signin", signinController);
userRouter.use("/signup", singupController);
userRouter.use("/uniqueid", uniqueidController);

export default userRouter;
