import { Request, Response } from "express";
import Blog from "../models/blog";
import cloudinary from "cloudinary";

const createBlog = async (req: Request, res: Response) => {
  try {
    const user = await Blog.findById(req.userID);
    let imageUrl = "";

    if (!user) {
      return res.status(404).json({ message: "User not found" }).send();
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

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  createBlog,
};
