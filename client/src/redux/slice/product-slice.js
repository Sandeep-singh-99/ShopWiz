import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (_, thunkApi) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/product/getProduct`
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk("product/fetchProductById", async (id, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/product/getProductById/${id}`);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }
})

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/product/addProduct`,
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
        `${API_BASE_URL}/api/product/deleteProduct/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// export const updateProduct = createAsyncThunk(
//   "products/updateProduct",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/products/updateProduct/${id}`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data.product;
//     } catch (error) {
//       return rejectWithValue(error.response.data || error.message);
//     }
//   }
// );
// ;

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

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.product = action.payload.data;
      state.loading = false;
      state.error = null;
    })

    builder.addCase(fetchProductById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


//     builder.addCase(updateProduct.fulfilled, (state, action) => {
//       const updatedProduct = action.payload.data; // Access the updated product from the response
    
//       // Debug log to confirm the payload is correct
//       console.log("Updated Product Payload:", updatedProduct);
    
//       if (!updatedProduct || !updatedProduct._id) {
//         console.error("Product ID is missing or invalid:", updatedProduct);
//         return;
//       }
    
//       // Find the index of the product in the state
//       const productIndex = state.product.findIndex((product) => product._id === updatedProduct._id);
    
//       if (productIndex !== -1) {
//         // Update the product in the state immutably
//         state.product[productIndex] = {
//           ...state.product[productIndex],
//           ...updatedProduct, // Merge the updated data
//         };
//         console.log(`Product with ID: ${updatedProduct._id} has been updated.`);
//       } else {
//         console.warn(`Product with ID: ${updatedProduct._id} not found in state.`);
        
//         // Optionally, add the product to the list if it should be there
//         state.product.push(updatedProduct);
//         console.log(`Product with ID: ${updatedProduct._id} added to the state.`);
//       }
    
//       // Reset loading state and clear errors
//       state.loading = false;
//       state.error = null;
//     });
    
    
    
    
    

//     builder.addCase(updateProduct.pending, (state, action) => {
//       state.loading = true;
//       state.error = null;
//     });

//     builder.addCase(updateProduct.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
  },
});

export default productSlice.reducer;
