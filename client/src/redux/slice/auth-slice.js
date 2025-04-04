import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:5000';

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/logout`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Logout failed");
  }
});


// Check Auth with Optimized Logic
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/check-auth`, { withCredentials: true });
    return response.data;
  } catch (error) {
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
  isAuthenticated: false, 
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
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
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;