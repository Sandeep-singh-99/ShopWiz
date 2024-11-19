import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import productSlice from "./slice/product-slice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
    },
    devTools: true
})

export default store;