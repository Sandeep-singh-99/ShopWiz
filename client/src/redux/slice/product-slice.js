import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk("product/fetchProduct", async (_, thunkApi) => {
    try {
        const response = await axios.post("http://localhost:5000/api/product/getProduct")
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})


const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        error: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.product = action.payload.data;
            state.loading = false;
            state.error = null;
        })

        builder.addCase(fetchProduct.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default productSlice.reducer;