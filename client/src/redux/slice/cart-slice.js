import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./auth-slice";

export const addCart = createAsyncThunk(
  "cart/addToCart",
  async (id, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/addtocart",
        { productId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage or another secure location
          },
          withCredentials: true, // Ensure cookies are sent with the request if needed
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const getToCart = createAsyncThunk(
  "cart/getToCart",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cart/view-cart-product",
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

export const countCartProduct = createAsyncThunk(
  "cart/countCartProduct",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cart/countAddToCartProduct",
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

export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/delete-cart-product/${id}`,
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

export const updateToCartProduct = createAsyncThunk(
  "cart/updateToCartProduct",
  async (id, quantity, thunkApi) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/update-cart-product/${id}`,
        quantity,
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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isLoading: false,
    error: null,
    countData: 0,
  },

  extraReducers: (builder) => {
    builder.addCase(addCart.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(addCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });

    builder.addCase(countCartProduct.pending, (state, action) => {
        state.isLoading = true;
    })

    builder.addCase(countCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    })

    builder.addCase(countCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countData = action.payload;
    })

    // Reset countData when the user logout
    builder.addCase(logout.fulfilled, (state, action) => {
        state.countData = 0;
        state.cartItems = [];
    })
  },
});

export default cartSlice.reducer;
