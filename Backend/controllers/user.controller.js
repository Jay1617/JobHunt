import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
    } = req.body;

    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All fileds are required.", 400));
    }
    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(
        new ErrorHandler("Please provide your preferred job niches.", 400)
      );
    }

    // Validate and format phone number
    function validateAndFormatPhone(phone) {
      const phoneRegex = /^[6-9][0-9]{9}$/;
      return phoneRegex.test(phone) ? phone : null;
    }

    const formattedPhone = validateAndFormatPhone(phone);

    if (!formattedPhone) {
      return next(new ErrorHandler("Please enter a valid phone number", 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        {
          email,
          accountVerified: true,
        },
        {
          phone,
          accountVerified: true,
        },
      ],
    });
    if (existingUser) {
      return next(new ErrorHandler("Email is already registered.", 400));
    }

    // Check if user has exceeded the maximum number of registration attempts
    const attemptTracker = {};
    const MAX_ATTEMPTS = 3;
    const ATTEMPT_RESET_TIME = 60 * 60 * 1000;

    const key = email || phone;

    if (!attemptTracker[key]) {
      attemptTracker[key] = { count: 1, lastAttempt: new Date() };
    } else {
      const { count, lastAttempt } = attemptTracker[key];
      const currentTime = new Date();

      if (currentTime - lastAttempt > ATTEMPT_RESET_TIME) {
        attemptTracker[key] = { count: 1, lastAttempt: currentTime };
      } else {
        if (count >= MAX_ATTEMPTS) {
          return next(
            new ErrorHandler(
              "You have exceeded the maximum number of registration attempts. Please try again 30 minutes.",
              400
            )
          );
        } else {
          attemptTracker[key].count += 1;
          attemptTracker[key].lastAttempt = currentTime;
        }
      }
    }

    // Generate verification code
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
    };
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Job_Seekers_Resume" }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              new ErrorHandler("Failed to upload resume to cloud.", 500)
            );
          }
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return next(new ErrorHandler("Failed to upload resume", 500));
        }
      }
    }

    const user = await User.create(userData);

    const verificationCode = await user.getVerificationCode();
    await user.save({ validateBeforeSave: false });

    // Send verification code to user's email
    sendVerificationCode(verificationCode, user.email, res);
  } catch (error) {
    next(error);
  }
});

// Generate verification code and send it to user's email
async function sendVerificationCode(verificationCode, email, res) {
  try {
    const message = generateEmailTemplate(verificationCode);

    await sendEmail(email, "Account Verification Code", message);

    res.status(201).json({
      success: true,
      message: `Verification code sent successfully to ${email}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send verification code",
    });
  }
}

// Generate email template
const generateEmailTemplate = (verificationCode) => {
  return `
      <div style="background-color: #000; color: #fff; font-family: Arial, sans-serif; padding: 20px; text-align: center; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
        <h2 style="color: #fff; font-size: 24px;">Verification Code</h2>
        <p style="font-size: 16px; color: #ccc; line-height: 1.5;">
          Thank you for using our service! Please use the verification code below to proceed with your request:
        </p>
        <div style="background-color: #222; padding: 15px; border-radius: 5px; margin: 20px auto; max-width: 300px;">
          <p style="font-size: 24px; font-weight: bold; margin: 0; color: #fff;">
            ${verificationCode}
          </p>
        </div>
        <p style="font-size: 14px; color: #bbb; line-height: 1.5;">
          If you did not request this code, please ignore this email or contact support.
        </p>
        <div style="margin-top: 20px; font-size: 12px; color: #555; border-top: 1px solid #444; padding-top: 10px;">
          <p>© 2025 JobHunt. All rights reserved.</p>
        </div>
      </div>
    `;
};

export const verifyAccount = catchAsyncErrors(async (req, res, next) => {
  const { email, verificationCode } = req.body;

  try {
    const userAllEntries = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    if (!userAllEntries || userAllEntries.length === 0) {
      return next(new ErrorHandler("User not found.", 404));
    }

    // console.log("User Entries:", userAllEntries);

    let user = userAllEntries[0];
    if (userAllEntries.length > 1) {
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });
      console.log("Older unverified users deleted.");
    }

    // console.log("User to verify:", user);

    if (
      !user.verificationCode ||
      user.verificationCode !== Number(verificationCode)
    ) {
      return next(new ErrorHandler("Invalid Verification Code.", 400));
    }

    console.log("Verification Code Matched!");

    if (!user.verificationCodeExpires) {
      return next(new ErrorHandler("Verification Code Expired.", 400));
    }

    const currentTime = Date.now();
    const verificationCodeExpire = new Date(
      user.verificationCodeExpires
    ).getTime();

    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler("Verification Code Expired.", 400));
    }

    // console.log("Verification Code is valid, updating user status...");

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save({ validateModifiedOnly: true });

    // console.log("User verified successfully!");
    sendToken(user, 200, "Account Verified.", res);
  } catch (error) {
    console.error("Error in verifyAccount:", error);
    return next(new ErrorHandler("Internal Server Error.", 500));
  }
});

//login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

//   console.log("Login Request:", req.body);
  
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required.", 400));
  }
  const user = await User.findOne({ email, accountVerified: true }).select(
    "+password"
  );
//   console.log(user);
  
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  sendToken(user, 200, "User logged in successfully.", res);
});

//logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});

export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
  
    res.status(200).json({
      success: true,
      user,
    });
  });
