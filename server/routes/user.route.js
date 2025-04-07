import express from 'express';
const router = express.Router();
import { register } from '../controllers/user.controller.js';
import { login } from '../controllers/user.controller.js';

router.route("/register").post(register);
router.route("/login").post(login);

export default router;