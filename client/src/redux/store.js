import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slice/auth-slice'
import cartSlice from './slice/cart-slice'
import productSlice from './slice/product-slice'
import categorySlice from './slice/category-slice'
import commentSlice from './slice/comment-slice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    product: productSlice,
    category: categorySlice,
    comment: commentSlice
  }
})

export default store;