import mongoose from "mongoose";

const uniqueIdSchema = mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const uniqueid = mongoose.model("uniqueid" , uniqueIdSchema)