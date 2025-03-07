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
router.put("update/password", isAuthenticated, updatePassword);
router.put("/dashboard/update", isAuthenticated, updateProfile);
router.post("/match-candiate", isAuthenticated, async(req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    
  }
});

export default router;
