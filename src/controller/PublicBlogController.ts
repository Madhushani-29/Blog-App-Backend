import Blog from "../models/blog";
import User from "../models/user";
import { Request, Response } from "express";

const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" }).send();
    }

    const blogs = await Blog.find({}).populate(
      "user",
      "firstName lastName imageUrl email"
    );
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

export default { getAllBlogs };
