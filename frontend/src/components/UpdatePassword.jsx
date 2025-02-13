import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllUpdateProfileErrors, updatePassword } from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";

const PasswordInput = ({ label, value, onChange, showPassword, togglePassword }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative rounded-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-500
                 focus:outline-none transition-colors duration-200"
      >
        {showPassword ? (
          <FaRegEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        ) : (
          <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        )}
      </button>
    </div>
  </div>
);

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated Successfully");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
      // Clear form after successful update
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [dispatch, error, isUpdated]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900">Update Password</h3>
            <p className="mt-2 text-sm text-gray-600">
              Make sure your new password is secure and different from previous ones
            </p>
          </div>

          <div className="space-y-6">
            <PasswordInput
              label="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              showPassword={showPassword.old}
              togglePassword={() => setShowPassword({...showPassword, old: !showPassword.old})}
            />

            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              showPassword={showPassword.new}
              togglePassword={() => setShowPassword({...showPassword, new: !showPassword.new})}
            />

            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPassword={showPassword.confirm}
              togglePassword={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
            />
          </div>

          <div className="mt-8">
            <button
              onClick={handleUpdatePassword}
              disabled={loading}
              className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg
                       hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;