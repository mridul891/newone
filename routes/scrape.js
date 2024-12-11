import express from 'express'
import { scrapeController } from '../controller/scrape.controller.js'

const scrapeRouter = express.Router()

scrapeRouter.use("/scraper" , scrapeController)

export default scrapeRouter;