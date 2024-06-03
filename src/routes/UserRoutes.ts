import express from "express";
import UserController from "../controller/UserController";
import { validateMyUserRequest } from "../middleware/validation";
import { firebaseAuthCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.get("/", firebaseAuthCheck, jwtParse, UserController.getCurrentUser);

router.post("/", firebaseAuthCheck, UserController.createUser);

router.put(
  "/",
  firebaseAuthCheck,
  jwtParse,
  validateMyUserRequest,
  UserController.updateCurrentUser
);

export default router;
