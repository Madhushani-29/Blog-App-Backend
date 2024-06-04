import express from "express";
import PublicBlogController from "../controller/PublicBlogController";
import multer from "multer";
import { validateMyBlogRequest } from "../middleware/validation";
import { firebaseAuthCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.get("/", firebaseAuthCheck, jwtParse, PublicBlogController.getAllBlogs);

export default router;
