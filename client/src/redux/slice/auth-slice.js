import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkApi) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/logout");
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/check-auth"
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

      // Check if response contains a token and status is OK
      if (response.status === 200 && response.data.success) {
        const token = response.data;
        if (token) {
          localStorage.setItem("adminToken", token); // Store the token in localStorage
        }
        return response.data;
      } else {
        localStorage.removeItem("adminToken"); // Clear any invalid tokens
        throw new Error("Invalid response data");
      }
    } catch (error) {
      localStorage.removeItem("adminToken"); // Clear any invalid tokens
      return thunkApi.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    isLoading: false,
    isToken: localStorage.getItem("authToken") || null,
    isAuthenticated: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isAuthenticated = true;
    });

    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isAuthenticated = true;
    });

    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.data = null;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(checkAuth.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isToken = action.payload;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(adminLogin.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(adminLogin.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
  },
});

export default authSlice.reducer;
