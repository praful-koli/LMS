// import express from "express";
// import fs from "fs";
// import path from "path";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// import { fileURLToPath } from "url";

// const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Certificate route
// router.post("/generate", async (req, res) => {
//   const { userName, courseName } = req.body;

//   try {
//     const templatePath = path.join(__dirname, "../templates/certificate_template.pdf");
//     const templateBytes = fs.readFileSync(templatePath);

//     const pdfDoc = await PDFDocument.load(templateBytes);
//     const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//     const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const page = pdfDoc.getPages()[0];

//     const pageWidth = page.getWidth();
//     const centerX = pageWidth / 2;

//     // Line 1: Certificate statement
//     const certText = "This is to certify that";
//     page.drawText(certText, {
//       x: centerX - boldFont.widthOfTextAtSize(certText, 20) / 2,
//       y: 400,
//       size: 20,
//       font: boldFont,
//       color: rgb(0.1, 0.1, 0.1),
//     });

//     // Line 2: User name
//     page.drawText(userName, {
//       x: centerX - boldFont.widthOfTextAtSize(userName, 28) / 2,
//       y: 340,
//       size: 28,
//       font: boldFont,
//       color: rgb(0.1, 0.1, 0.1),
//     });

//     // Line 3-6: Course completion statement
//     const lines = [
//       "has successfully completed the",
//       `"${courseName}" course, having met all academic`,
//       "and practical requirements, and exhibited",
//       "commendable performance throughout the program.",
//     ];

//     const fonts = [boldFont, regularFont, regularFont, regularFont];
//     const sizes = [18, 18, 18, 18];
//     let y = 280;

//     for (let i = 0; i < lines.length; i++) {
//       const text = lines[i];
//       const font = fonts[i];
//       const size = sizes[i];

//       page.drawText(text, {
//         x: centerX - font.widthOfTextAtSize(text, size) / 2,
//         y,
//         size,
//         font,
//         color: rgb(0.1, 0.1, 0.1),
//       });

//       y -= 20;
//     }

//     // Save and export
//     const pdfBytes = await pdfDoc.save();
//     const fileName = `${userName.replace(/\s/g, "_")}-${courseName.replace(/\s/g, "_")}.pdf`;
//     const outputPath = path.join(__dirname, `../../certificates/${fileName}`);
//     fs.writeFileSync(outputPath, pdfBytes);

//     const fullURL = `${process.env.SERVER_URL || "http://localhost:8080"}/certificates/${fileName}`;
//     res.json({ certificateUrl: fullURL });
//   } catch (err) {
//     console.error("Certificate generation error:", err);
//     res.status(500).json({ error: "Failed to generate certificate" });
//   }
// });


// export const getUserCertificates = async (req, res) => {
//   try {
//     const { userName } = req.params;
//      console.log(userName)
//     // Path to the certificates directory
//     const certificatesDir = path.join(__dirname, "../../certificates");
//       console.log(certificatesDir)
//     // Check if the directory exists
//     if (!fs.existsSync(certificatesDir)) {
//       return res.status(404).json({
//         success: false,
//         message: "No certificates found.s",
//       });
//     }

//     // Get all files in the directory
//     const files = fs.readdirSync(certificatesDir);
//     console.log(files)
//     // Filter files that belong to the user
//     // const userCertificates = files.filter((file) => file.startsWith(userName));
//     const normalizedUserName = userName.replace(/\s/g, "_");
//     const userCertificates = files.filter(file =>
//       file.startsWith(normalizedUserName)
//     )
//      console.log(userCertificates)
//     // Return the list of certificates
//     res.status(200).json({
//       success: true,
//       certificates: userCertificates.map((file) => ({
//         fileName: file,
//         url: `http://localhost:8080/certificates/${file}`,
//       })),
//     });
//   } catch (error) {
//     console.error("Error fetching certificates:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch certificates.",
//     });
//   }
// };
// export default router;






// import express from "express";
// import fs from "fs";
// import path from "path";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// import { fileURLToPath } from "url";
// import { uploadCertificate } from "../utils/cloudinary.js"; // ⬅️ your Cloudinary uploader
// import { User } from "../models/user.model.js"; // ⬅️ your Mongoose User model
// import {  uploadMedia } from "../utils/cloudinary.js";
// const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Certificate generation & upload route
// router.post("/generate", async (req, res) => {
//   const { userId, userName, courseName } = req.body;

//   try {
//     // ✅ Validate input
//     if (!userId || !userName || !courseName) {
//       return res.status(400).json({ error: "Missing userId, userName, or courseName" });
//     }

//     // ✅ Resolve template path
//     const templatePath = path.join(__dirname, "../templates/certificate_template.pdf");
//     console.log("Template Path:", templatePath);

//     if (!fs.existsSync(templatePath)) {
//       return res.status(500).json({ error: "Certificate template not found on server" });
//     }

//     const templateBytes = fs.readFileSync(templatePath);

//     // ✅ Load and modify PDF
//     const pdfDoc = await PDFDocument.load(templateBytes);
//     const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//     const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const page = pdfDoc.getPages()[0];

//     const pageWidth = page.getWidth();
//     const centerX = pageWidth / 2;

//     // Certificate text
//     const certText = "This is to certify that";
//     page.drawText(certText, {
//       x: centerX - boldFont.widthOfTextAtSize(certText, 20) / 2,
//       y: 400,
//       size: 20,
//       font: boldFont,
//       color: rgb(0.1, 0.1, 0.1),
//     });

//     page.drawText(userName, {
//       x: centerX - boldFont.widthOfTextAtSize(userName, 28) / 2,
//       y: 340,
//       size: 28,
//       font: boldFont,
//       color: rgb(0.1, 0.1, 0.1),
//     });

//     const lines = [
//       "has successfully completed the",
//       `"${courseName}" course, having met all academic`,
//       "and practical requirements, and exhibited",
//       "commendable performance throughout the program.",
//     ];

//     let y = 280;
//     for (const text of lines) {
//       page.drawText(text, {
//         x: centerX - regularFont.widthOfTextAtSize(text, 18) / 2,
//         y,
//         size: 18,
//         font: regularFont,
//         color: rgb(0.1, 0.1, 0.1),
//       });
//       y -= 20;
//     }

//     // ✅ Save PDF to buffer
//     const pdfBytes = await pdfDoc.save();

//     // ✅ Ensure /temp/ folder exists
//     const tempDir = path.join(__dirname, "../../temp");
//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir, { recursive: true });
//       console.log("Created temp directory:", tempDir);
//     }

//     const sanitizedUserName = userName.replace(/\s+/g, "_");
//     const sanitizedCourseName = courseName.replace(/\s+/g, "_");
//     const tempFilePath = path.join(tempDir, `${sanitizedUserName}-${sanitizedCourseName}.pdf`);
//     console.log("Temp File Path:", tempFilePath);

//     fs.writeFileSync(tempFilePath, pdfBytes);
//     console.log("PDF saved to temp path");

//     // ✅ Upload to Cloudinary
//     console.log("Uploading to Cloudinary...");
//     const uploadResponse = await uploadMedia(tempFilePath);
//     console.log("Upload Response:", uploadResponse);

//     // ✅ Delete temp file
//     fs.unlinkSync(tempFilePath);
//     console.log("Temp file deleted");

//     // ✅ Store certificate URL in user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (!user.certificates) user.certificates = [];
//     user.certificates.push({
//       courseName,
//       url: uploadResponse.secure_url,
//     });

//     await user.save();

//     res.json({
//       success: true,
//       certificateUrl: uploadResponse.secure_url,
//     });
//   } catch (err) {
//     console.error("Certificate generation error:", err);
//     res.status(500).json({ error: "Failed to generate/upload certificate" });
//   }
// });







import express from "express";
import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";
import { fileURLToPath } from "url";
import { uploadMedia } from "../utils/cloudinary.js"; // Cloudinary uploader
import { User } from "../models/user.model.js"; // Mongoose User model

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🎯 Certificate Generation Route
router.post("/generate", async (req, res) => {
  console.log(req.body);
  const { userId, userName, courseName } = req.body;

  try {
    // ✅ Validate Input
    if (!userId || !userName || !courseName) {
      return res.status(400).json({ error: "Missing userId, userName, or courseName" });
    }

    // ✅ Load Background Image (PNG, NOT PDF!)
    const templatePath = path.join(__dirname, "../templates/certificate_template-1.PNG");
    console.log("Template Path:", templatePath);
    if (!fs.existsSync(templatePath)) {
      console.error("Certificate template not found:", templatePath);
      return res.status(500).json({ error: "Certificate template not found on server" });
    }

    const templateImage = await loadImage(templatePath);
    const canvas = createCanvas(1200, 800);
    const ctx = canvas.getContext("2d");

    // ✅ Draw Certificate Background
    ctx.drawImage(templateImage, 0, 0, 1200, 800);

    // ✅ Add Certificate Text
    ctx.fillStyle = "#333";
    
    // 🎖️ Main Certificate Statement
    const certText = "This is to certify that";
ctx.font = "bold 20px Arial";
ctx.fillStyle = "#333";
ctx.fillText(certText, 600 - ctx.measureText(certText).width / 2, 250); // Adjusted Y position

// ✅ User Name
ctx.font = "bold 32px Arial";
ctx.fillText(userName, 600 - ctx.measureText(userName).width / 2, 330); // Adjusted Y position

// ✅ Course Details
const lines = [
  "has successfully completed the",
  `"${courseName}" course, having met all academic`,
  "and practical requirements, and exhibited",
  "commendable performance throughout the program.",
];

ctx.font = "18px Arial";
let y = 500; // Start position for text
for (const text of lines) {
  ctx.fillText(text, 600 - ctx.measureText(text).width / 2, y);
  y -= 30; // Adjust spacing between lines
}

    // ✅ Save Image to Temp Folder
    const tempDir = path.join(__dirname, "../../temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(tempDir, `${userName.replace(/\s+/g, "_")}-${courseName.replace(/\s+/g, "_")}.png`);
    console.log("Temp File Path:", tempFilePath);

    const out = fs.createWriteStream(tempFilePath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    await new Promise((resolve) => out.on("finish", resolve));

    // ✅ Upload to Cloudinary
    console.log("Uploading to Cloudinary...");
    const uploadResponse = await uploadMedia(tempFilePath);
    console.log("Upload Response:", uploadResponse);

    // ✅ Delete Temp File
    fs.unlinkSync(tempFilePath);
    console.log("Temp file deleted");

    // ✅ Store Certificate URL in User Database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.certificates) user.certificates = [];
    user.certificates.push({ courseName, url: uploadResponse.secure_url });

    await user.save();

    res.json({ success: true, certificateUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error("Certificate generation error:", err);
    res.status(500).json({ error: "Failed to generate/upload certificate" });
  }
});







export const getUserCertificates = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("User ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User Certificates:", user.certificates); // Corrected line
    res.json({
      success: true,
      certificates: user.certificates,
    });
  } catch (err) {
    console.error("Error fetching user certificates:", err);
    res.status(500).json({ success: false, message: "Failed to fetch certificates" });
  }
};


export default router;