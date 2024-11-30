import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import productSlice from "./slice/product-slice"
import categorySlice from "./slice/category-slice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        category: categorySlice
    },
    devTools: true
})

export default store;