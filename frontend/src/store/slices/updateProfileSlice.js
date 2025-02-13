import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updateProfileFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    updatePasswordRequest(state) {
      state.loading = true;
    },
    updatePasswordSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    profileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdated = false;
      state.loading = false;
    },
  },
});

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileRequest());
  try {
    await axios.put(
      "http://localhost:5500/api/v1/user/dashboard/update",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(updateProfileSlice.actions.updateProfileSuccess());
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updateProfileFailed(
        error.response?.data?.message || "Failed to update profile."
      )
    );
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updatePasswordRequest());

  try {
    await axios.put("http://localhost:5500/api/v1/user/update/password", data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    dispatch(updateProfileSlice.actions.updatePasswordSuccess());
    toast.success("Password updated successfully!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update password.";
    dispatch(updateProfileSlice.actions.updatePasswordFailed(errorMessage));
    toast.error(errorMessage);
  }
};

export const clearAllUpdateProfileErrors = () => (dispatch) => {
  dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;
