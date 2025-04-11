import Stripe from "stripe";
import Razorpay from "razorpay";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay order
import razorpayInstance from "../razorpayInstance.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    const options = {
      amount: course.coursePrice * 100,
      currency: "INR",
      receipt: `receipt_${Math.random() * 1000}`,
    };

    const order = await razorpayInstance.orders.create(options);

    const newPurchase = await CoursePurchase.create({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
      paymentId: order.id, // Save the Razorpay order ID
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: course.coursePrice * 100,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
      courseId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Verify the payment signature and update the purchase status

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    // Update the purchase record in the database (if applicable)
    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify the webhook signature
    const receivedSignature = req.headers["x-razorpay-signature"];
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (receivedSignature !== generatedSignature) {
      console.log("⚠️  Webhook signature verification failed.");
      return res.status(400).json({ message: "Invalid signature" });
    }

    const event = req.body;

    // Handle payment.captured event
    if (event.event === "payment.captured") {
      const paymentId = event.payload.payment.entity.id;
      const orderId = event.payload.payment.entity.order_id;

      console.log("Webhook Event:", JSON.stringify(event, null, 2));

      // Find the purchase record using the orderId
      let purchase = await CoursePurchase.findOne({ paymentId: orderId }).populate({
        path: "courseId",
      });

      // Retry logic: Wait for the purchase record to be created
      if (!purchase) {
        console.log("Purchase not found, retrying...");
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
        purchase = await CoursePurchase.findOne({ paymentId: orderId }).populate({
          path: "courseId",
        });
      }

      if (!purchase) {
        console.log("No purchase found for Razorpay order ID:", orderId);
        return res.status(404).json({ message: "Purchase not found" });
      }

      // Update purchase status to completed
      purchase.status = "completed";
      purchase.amount = event.payload.payment.entity.amount / 100;

      // Make all lectures of the course visible
      if (purchase.courseId?.lectures?.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Add course to user's enrolled courses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      // Add user to course's enrolled students
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );

      console.log("✅ Razorpay purchase updated successfully");
      return res.status(200).json({ success: true, message: "Payment captured & course access granted" });
    }

    res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Webhook Handler Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
import mongoose from "mongoose";

export const getCourseDetailWithStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const purchased = await CoursePurchase.findOne({
      userId: new mongoose.Types.ObjectId(String(userId)),
      courseId: new mongoose.Types.ObjectId(String(courseId)),
      status: "completed",
    });
    

    return res.status(200).json({
      course,
      purchased: !!purchased,
      status: purchased ? purchased.status : "not purchased",
    });
  } catch (error) {
    console.error("Error fetching course detail with status:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId, userId } = req.params;
   const id = userId?._id
  console.log("User ID:", userId);
    console.log("Course ID:", courseId);
    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ courseId , id});
    console.log( "backend",purchased);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};





export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
