import express from "express";
import UserController from "../controller/UserController";
import { validateMyUserRequest } from "../middleware/validation";
import { firebaseAuthCheck, jwtParse } from "../middleware/auth";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, 
  },
});

router.get("/", firebaseAuthCheck, jwtParse, UserController.getCurrentUser);

router.post("/", firebaseAuthCheck, UserController.createUser);

router.put(
  "/",
  upload.single("imageFile"),
  firebaseAuthCheck,
  jwtParse,
  validateMyUserRequest,
  UserController.updateCurrentUser
);

export default router;
