import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../helper/services/productService";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

// 🧩 Get all products
export const getAllProductsThunk = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await productService.getAllProducts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch products"
      );
    }
  }
);

// 🧩 Add a new product
export const addProductThunk = createAsyncThunk(
  "products/add",
  async ({ formData, token }, thunkAPI) => {
    try {
      const { data } = await productService.addProduct(formData, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch All
      .addCase(getAllProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Add Product
      .addCase(addProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.products.push(action.payload);
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
