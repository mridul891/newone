import mongoose from "mongoose";

// Define the schema
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  news: {
    type: String,
    required: true,
  },
  disasterType: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  desc: {
    type: String,
  },
  location: {
    type: String,
  },
});

// Create the model
export const News = mongoose.model("News", NewsSchema);
