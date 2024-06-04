import { Request, Response } from "express";
import Blog from "../models/blog";
import cloudinary from "cloudinary";
import User from "../models/user";

const createBlog = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userID);
    let imageUrl = "";

    if (!user) {
      return res.status(400).json({ message: "User not found" }).send();
    }

    if (req.file) {
      imageUrl = await uploadImage(req.file as Express.Multer.File);
    }

    const newBlog = new Blog({ ...req.body, imageUrl, user: req.userID });
    await newBlog.save();

    res.status(201).json(newBlog.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating blog" });
  }
};

const getBlogs = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" }).send();
    }

    const blogs = await Blog.find({ user: req.userID });
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" }).send();
      console.log("User not found");
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" }).send();
    }

    blog.title = req.body.title;
    blog.content = req.body.content;

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      blog.imageUrl = imageUrl;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });

    res.status(201).json(updatedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating blog" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  createBlog,
  getBlogs,
  updateBlog,
};
