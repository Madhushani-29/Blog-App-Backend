import { Request, Response } from "express";
import User from "../models/user";

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
    const  uid  = req.firebaseUID;
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" }).send();
    }

    const newUser = new User({...req.body, uid});
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

    if (!user) {
      return res.status(404).json({ message: "User not found" }).send();
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
      new: true,
    });

    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  getCurrentUser,
  createUser,
  updateCurrentUser,
};
