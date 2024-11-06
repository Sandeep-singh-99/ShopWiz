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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    isLoading: false,
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false
        state.isError = false
    })

    builder.addCase(register.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
    })

    builder.addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
    })

    builder.addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false
        state.isError = false
    })

    builder.addCase(login.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
    })

    builder.addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
    })
  }
});


export default authSlice.reducer;