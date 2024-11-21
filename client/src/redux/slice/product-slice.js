import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (_, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/getProduct"
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/addProduct",
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/deleteProduct/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }, thunkApi) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/product/updateProduct/${id}`,
        data, // Pass the form data here
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for handling file uploads
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    data: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload.data;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(addProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(deleteProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      console.log("Updated Product Payload:", action.payload); // Debug log
      const index = state.product.findIndex((product) => product._id === action.payload._id);
    
      if (index !== -1) {
        // Merge updated product data immutably
        state.product[index] = { ...state.product[index], ...action.payload };
      } else {
        console.warn("Updated product ID not found in state:", action.payload._id);
        // Optionally, add the product to the state if it should be there
        state.product.push(action.payload);
      }
    
      state.loading = false;
      state.error = null;
    });
    

    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
