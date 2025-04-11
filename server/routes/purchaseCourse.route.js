// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";

// const router = express.Router();

// router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
// router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
// router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);

// router.route("/").get(isAuthenticated,getAllPurchasedCourse);

// export default router;






import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createRazorpayOrder,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  razorpayWebhook,
  verifyRazorpayPayment,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// Razorpay order creation
router.post("/razorpay/create-order", isAuthenticated, createRazorpayOrder);
// Razorpay webhook for payment verification
router.post("/webhook", express.raw({ type: "application/json" }), razorpayWebhook);
// Razorpay payment verification
router.post("/razorpay/verify-payment", isAuthenticated, verifyRazorpayPayment);
// Common
router.route("/course/:courseId/:userId/detail-with-status").get( getCourseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);
export default router;






