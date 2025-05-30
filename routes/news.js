import express from "express";
import { newsController } from "../controller/news.controller.js";

console.log(newsController);


const newsRouter = express.Router()
newsRouter.use("/news" , newsController)

export default newsRouter