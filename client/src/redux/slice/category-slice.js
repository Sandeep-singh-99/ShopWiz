import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (category, thunkApi) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getProductByCategory/categorywise/${category?.join(",")}`
      );
      return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const categorytSlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload.data;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default categorytSlice.reducer;
