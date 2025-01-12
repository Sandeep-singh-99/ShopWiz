import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import authSlice from "./slice/auth-slice";
import productSlice from "./slice/product-slice"
import categorySlice from "./slice/category-slice"
import cartSlice from "./slice/cart-slice"
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root', // Key for the persisted state
  storage,
  // Specify which reducers to persist (in this case, only cart)
};

const persistedReducer = persistReducer(persistConfig, 
    combineReducers({
        auth: authSlice,
        product: productSlice,
        category: categorySlice,
        cart: cartSlice 
    })
);

const store = configureStore({
  reducer: persistedReducer, 
  devTools: true
});

export const persistor = persistStore(store);
export default store;