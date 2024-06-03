import { Request, Response } from "express";
import User from "../models/user";
import cloudinary from "cloudinary";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" }).send();
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding the user" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const uid = req.firebaseUID;
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" }).send();
    }

    const newUser = new User({ ...req.body, uid });
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userID);
    console.log(req.body);

    if (!user) {
      return res.status(404).json({ message: "User not found" }).send();
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      user.imageUrl = imageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    console.log("Updated user", updatedUser);
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
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
  getCurrentUser,
  createUser,
  updateCurrentUser,
};
