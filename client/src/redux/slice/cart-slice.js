import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./auth-slice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 

export const addCart = createAsyncThunk(
  "cart/addToCart",
  async (id, thunkApi) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/cart/addtocart`,
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
        `${API_BASE_URL}/api/cart/view-cart-product`,
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
        `${API_BASE_URL}/api/cart/countAddToCartProduct`,
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
        `${API_BASE_URL}/api/cart/delete-cart-product`,
        {
          data: { _id: id }, // Send the `id` in the request body
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const updateToCartProduct = createAsyncThunk(
  "cart/updateToCartProduct",
  async ({ _id, quantity }, thunkApi) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/cart/update-cart-product`,
        { _id, quantity }, // Send both the ID and new quantity in the body
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isLoading: false,
    error: null,
    data: null,
    countData: 0,
  },
  reducers: {
    restartCartCount: (state) => {
      state.countData = 0;
    },
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
      state.data = action.payload;
    });

    builder.addCase(countCartProduct.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(countCartProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(countCartProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.countData = action.payload;
    });

    builder.addCase(getToCart.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data;
    });

    builder.addCase(deleteCartProduct.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(deleteCartProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteCartProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;

      // Remove the deleted product from the cartItems
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.meta.arg // `action.meta.arg` contains the `id` passed to the thunk
      );
    });

    // Reset countData when the user logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.countData = 0;
      state.cartItems = [];
    });

    builder.addCase(updateToCartProduct.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateToCartProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.cartItems = state.cartItems.map(item =>
      //   item._id === action.payload.data._id
      //     ? { ...item, quantity: action.payload.data.quantity } // Update the quantity of the updated item
      //     : item
      // );

      // Check if the payload structure is correct
      const updatedItem = action.payload.data || action.payload;

      // Map through cartItems and update the item quantity if the _id matches
      state.cartItems = state.cartItems.map((item) =>
        item._id === updatedItem._id
          ? { ...item, quantity: updatedItem.quantity } // Update quantity
          : item
      );
    });

    builder.addCase(updateToCartProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { restartCartCount } = cartSlice.actions;

export default cartSlice.reducer;
