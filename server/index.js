import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
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

app.use("/api/v1/user", userRoute);
app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "hello i am coming from home route"
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});