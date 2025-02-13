import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.withCredentials = true;

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await axios.get(`${API_BASE_URL}/api/auth/logout`);
    thunkApi.dispatch(logoutAuth());
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Logout failed");
  }
});


// Check Auth with Optimized Logic
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkApi) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return thunkApi.rejectWithValue("No token found");
    }

    const response = await axios.get(`${API_BASE_URL}/api/auth/check-auth`, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response?.status === 403 || error.response?.status === 401) {
      thunkApi.dispatch(logoutAuth());
    }
    return thunkApi.rejectWithValue(error.response?.data || "Authentication failed");
  }
});


export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/admin-login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("adminToken", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLoading: false,
  isAuthenticated: false, //!!localStorage.getItem("token"), // Use a boolean for clarity
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("loginData", JSON.stringify(action.payload));
    },
    logoutAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("loginData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { login, logoutAuth } = authSlice.actions;
export default authSlice.reducer;