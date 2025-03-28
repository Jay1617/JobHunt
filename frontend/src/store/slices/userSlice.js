import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    error: null,
    message: null,
  },
  reducers: {
    // Register Actions
    initializeAuthSuccess(state) {
      state.isInitialized = true;
    },
    registerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Login Actions
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Fetch User Actions
    fetchUserRequest(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Logout Actions
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.message = null;
    },
    logoutFailed(state, action) {
      state.error = action.payload;
    },

    // Clear Errors
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Exporting Actions
export const {
  registerRequest,
  registerSuccess,
  registerFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailed,
  logoutSuccess,
  logoutFailed,
  clearAllErrors,
} = userSlice.actions;

// Thunk Actions
export const register = (formData, navigateTo) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const email = formData.get("email");

    const response = await axios.post(
      "http://localhost:5500/api/v1/user/register",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(registerSuccess(response.data));

    await dispatch(getUser());

    navigateTo(`/verify-otp/${email}`, {
      state: { email: email },
    });
  } catch (error) {
    dispatch(registerFailed(error.response?.data?.message || "Registration failed"));
  }
};

export const verifyOtp = (email, verificationCode) => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    // console.log("==>", email);
    const response = await axios.post(
      "http://localhost:5500/api/v1/user/verify-otp",
      { email, verificationCode },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    dispatch(fetchUserSuccess(response.data.user));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(
      fetchUserFailed(
        error.response?.data?.message || "OTP verification failed"
      )
    );
    toast.error(
      error.response?.data?.message || "Invalid OTP. Please try again."
    );
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:5500/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(loginSuccess(response.data));
    await dispatch(getUser()).unwrap();
  } catch (error) {
    dispatch(loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "http://localhost:5500/api/v1/user/my-profile",
      {
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed(error.response?.data?.message || "User fetch failed"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:5500/api/v1/user/logout", {
      withCredentials: true,
    });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed(error.response.data.message));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export default userSlice.reducer;
