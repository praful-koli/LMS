import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import purchaseRoute from './routes/purchaseCourse.route.js';
import courseProgressRoute from './routes/courseProgress.route.js';
dotenv.config();
// call database connection
connectDB();

const PORT = process.env.PORT || 3000;
//  defult middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
// api routes
app.use("/api/v1/progress", courseProgressRoute)
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "hello i am coming from home route"
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});