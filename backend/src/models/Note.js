import mongoose from "mongoose";

// 1- crate a schema

// 2- model based off of that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // crreatedAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
