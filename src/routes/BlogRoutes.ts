import express from "express";
import BlogController from "../controller/BlogController";
import multer from "multer";
import { validateMyBlogRequest } from "../middleware/validation";
import { firebaseAuthCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  upload.single("imageFile"),
  firebaseAuthCheck,
  jwtParse,
  validateMyBlogRequest,
  BlogController.createBlog
);

router.get("/", firebaseAuthCheck, jwtParse, BlogController.getBlogs);

router.put(
  "/:id",
  upload.single("imageFile"),
  firebaseAuthCheck,
  jwtParse,
  BlogController.updateBlog
);

router.delete("/:id", firebaseAuthCheck, jwtParse, BlogController.deleteBlog);

export default router;
