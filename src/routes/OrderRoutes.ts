import express from "express";
import { firebaseAuthCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controller/OrderController";

const router = express.Router();

router.get(
  "/",
  firebaseAuthCheck,
  jwtParse,
  OrderController.getMyOrders
);

router.post(
  "/checkout/create-checkout-session",
  firebaseAuthCheck,
  jwtParse,
  OrderController.createCheckoutSession
);

router.post("/checkout/webhook", OrderController.stripeWebhookHandler);

export default router;
