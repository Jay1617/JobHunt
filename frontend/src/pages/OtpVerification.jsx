import React, { useState } from "react";
import "../styles/OtpVerification.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../store/slices/userSlice";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email; // Extract email from Register page
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    dispatch(verifyOtp(email, enteredOtp)).then(() => {
      navigate("/"); // Redirect after successful verification
    });
  };

  return (
    <div className="otp-verification-page">
      <div className="otp-container">
        <h1>OTP Verification</h1>
        <p>Enter the 6-digit OTP sent to your registered email.</p>
        <form onSubmit={handleOtpVerification} className="otp-form">
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="otp-input"
              />
            ))}
          </div>
          <button type="submit" className="verify-button" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;