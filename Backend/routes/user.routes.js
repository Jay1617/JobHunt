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
import axios from "axios";

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
router.post("/match-candidates", isAuthenticated, async (req, res) => {
  try {
    const { job, jobApplications } = req.body;

    // console.log("Job:", job);
    // console.log("Job Applications:", jobApplications);

    const response = await axios.post(
      "http://127.0.0.1:5000/match-candidates", 
      {
        job,
        jobApplications,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("ML Service Response:", response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in matching candidates:", error);

    return res.status(500).json({
      success: false,
      message: "Error processing candidate matching",
      error: error.message,
      stack: error.stack, 
    });
  }
});
export default router;
