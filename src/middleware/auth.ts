import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import admin from "../config/firebase-config";
declare global {
  namespace Express {
    interface Request {
      userID: string;
      firebaseUID: string;
    }
  }
}

export const firebaseAuthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.firebaseUID = decodedToken.uid;

    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.sendStatus(401);
  }
};

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firebaseUID } = req;

  try {
    const user = await User.findOne({ firebaseUID });

    if (!user) {
      console.error("User not found for firebaseUID:", firebaseUID);
      return res.sendStatus(401);
    }

    req.userID = user._id.toString();
    next();
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return res.sendStatus(401);
  }
};
