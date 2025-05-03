import express from "express";
import  generateCertificate, { getUserCertificates }  from "../controllers/certificate.controller.js";

const router = express.Router();

// Route to generate a certificate
router.post("/generate", generateCertificate);
router.get("/certificates/:userId", getUserCertificates);

export default router;