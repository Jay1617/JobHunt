import express from 'express';
import { getUserProfile, login, logout, register, verifyAccount } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyAccount);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getUserProfile);


export default router;