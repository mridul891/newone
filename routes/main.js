import express from "express";
const mainRouter = express.Router();
import userRouter from './user.js'
import scrapeRouter from "./scrape.js";
import newsRouter from "./news.js";


mainRouter.use("/user", userRouter);
mainRouter.use("/scrape" , scrapeRouter)
mainRouter.use("/news" ,newsRouter )

export default mainRouter
