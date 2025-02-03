import { User } from "../models/user.model.js";
import ErrorHandler from "./error.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js"; 
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.cookies;

    // console.log(req.cookies);
    if (!token) {
      return next(new ErrorHandler("User is not Authenticated", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorHandler("Error in Authentication", 401));
  }
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource.`
        )
      );
    }
    next();
  };
};