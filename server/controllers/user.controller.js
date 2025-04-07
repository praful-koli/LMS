// import {User} from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../utils/generateToken.js";
// export const register = async (req, res) => {
//   try {
//     // Logic for user registration
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required." });
//     }
//     // Check if user already exists
//     const user = await User.findOne({ email });
//     if (user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User already exists with this email & name." });
//     }
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     await User.create({
//          name,
//          email,
//          password : hashedPassword
//         });
//     // Send success response
//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "failed to register user", 
//     });
//   }
// };

// export const login = async (req, res) => {
//     try {
//         // Logic for user login
//         const { email, password } = req.body;
//         if (!email || !password) {
//         return res
//             .status(400)
//             .json({ success: false, message: "All fields are required." });
//         }
//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//         return res
//             .status(400)
//             .json({ success: false, message: "Invalid credentials." });
//         }
//         // Compare passwords
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//         return res
//             .status(400)
//             .json({ success: false, message: "Invalid Password." });
//         }

//         // Generate JWT token (optional, if you want to implement JWT authentication)
//         generateToken(res,user , `welcome back ${user.name}`);

//         // Send success response
//         return res.status(200).json({
//         success: true,
//         message: "User logged in successfully",
//         user,
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//           success: false,
//           message: "failed to login user", 
//         });
//      }
// }


import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists with this email." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password." });
    }

    // Set token and send response
    return generateToken(res, user, `Welcome back, ${user.name}`);

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to login user",
    });
  }
};

export const logout =  async (req, res) => {
  try {
    return res.status(200).cookie("token", "", {maxAge:0}).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    console.error("logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout ",
    });
  }
}

// Get User Profile Controller

export const getUserProfileller = async (req, res) => { 
    try {
      
    } catch (error) {
      console.error( error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout ",
    });
    }
 }