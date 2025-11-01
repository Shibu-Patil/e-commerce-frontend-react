import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../helper/services/cartService";

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

// 🟢 Add to Cart
export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async ({ payload, token }, thunkAPI) => {
    try {
      const { data } = await cartService.addToCart(payload, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add item"
      );
    }
  }
);

// 🟢 Get Cart
export const getCartThunk = createAsyncThunk(
  "cart/",
  async (token, thunkAPI) => {
    try {
      const { data } = await cartService.getCart(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to get cart"
      );
    }
  }
);

// 🟢 Remove Item
export const removeFromCartThunk = createAsyncThunk(
  "cart/remove",
  async ({ productId, token }, thunkAPI) => {
    try {
      const { data } = await cartService.removeFromCart(productId, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to remove item"
      );
    }
  }
);

// 🟢 Clear Cart
export const clearCartThunk = createAsyncThunk(
  "cart/clear",
  async (token, thunkAPI) => {
    try {
      const { data } = await cartService.clearCart(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to clear cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🟢 Add to Cart
      .addCase(addToCartThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload; // backend returns updated cart
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🟢 Get Cart
      .addCase(getCartThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🟢 Remove Item
      .addCase(removeFromCartThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🟢 Clear Cart
      .addCase(clearCartThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
