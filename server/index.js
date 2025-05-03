import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import purchaseRoute from './routes/purchaseCourse.route.js';
import courseProgressRoute from './routes/courseProgress.route.js';
import certificateRoute from "./routes/certificate.route.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Certificates directory path
const certificatesDir = path.join(__dirname, "../certificates");

// Check and create certificates folder if not exists
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir, { recursive: true });
  console.log("Certificates folder created successfully.");
} else {
  console.log("Certificates folder already exists.");
}

// Serve certificates statically
app.use("/certificates", express.static(certificatesDir));

// Connect to the database
connectDB();

// Set up middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // Adjust this as needed
  credentials: true,
}));

// API routes
app.use("/api/v1/certificate", certificateRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

// Simple home route
app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "hello, I am coming from home route"
  });
});

// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
