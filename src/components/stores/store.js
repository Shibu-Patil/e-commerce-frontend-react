import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../slices/slice";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";

export const store =configureStore({
    reducer:{
        user:userReducer,
        products: productReducer,
        cart: cartReducer,
    }
})