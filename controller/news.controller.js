import { News } from "../model/News.js"

export const newsController = async ( req , res) =>{
    const data = await News.find({
        disasterType : req.body.type
    })

    console.log(data)
}