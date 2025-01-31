import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../helpers/axiosInstance";

// axios.defaults.withCredentials = true;

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axiosInstance.get(
      "http://localhost:5000/api/auth/logout"
    );
    localStorage.removeItem("token");
    localStorage.removeItem("loginData");
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkApi) => {
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkApi.rejectWithValue("No token found");
      }

      const response = await axiosInstance.get(
        "http://localhost:5000/api/auth/check-auth",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/admin-login",
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
  isAuthenticated: !!localStorage.getItem("token"), // Use a boolean for clarity
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // Set the user data in state
    },
    logoutAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("loginData");
    },
    // Other reducers if needed...
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("loginData");
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});
export const { login, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
