import express from "express";
import {
  forgotPassword,
  getUserProfile,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  verifyAccount,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyAccount);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getUserProfile);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticated, updatePassword);
router.put("/profile/update", isAuthenticated, updateProfile);

export default router;
