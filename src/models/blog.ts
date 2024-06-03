import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
