import express from "express";
import MyRestaurantController from "../controller/MyRestaurantController";
import multer from "multer";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { firebaseAuthCheck, jwtParse } from "../middleware/auth";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

router.get(
  "/",
  firebaseAuthCheck,
  jwtParse,
  MyRestaurantController.getCurrentRestaurant
);

router.post(
  "/",
  upload.single("imageFile"),
  firebaseAuthCheck,
  jwtParse,
  validateMyRestaurantRequest,
  MyRestaurantController.createRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  firebaseAuthCheck,
  jwtParse,
  validateMyRestaurantRequest,
  MyRestaurantController.updateRestaurant
);

router.get(
  "/orders",
  firebaseAuthCheck,
  jwtParse,
  MyRestaurantController.getMyRestaurantOrders
);

router.patch(
  "/order/:orderID/status",
  firebaseAuthCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurantStatus
);
export default router;
