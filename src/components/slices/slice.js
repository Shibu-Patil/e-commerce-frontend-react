import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../helper/services/userService";

const initalState={
    userDetails:{
        userName:null,
        userId:null,
        email:null,
        userProfilePhoto:null
    },
    isLogged:false,
    role:null,
    isLoading:false,
    error:null,
    cart:[],
}


export const registerUSerThunk = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    console.log(payload);
    
    try {
      const { data } = await userService.registerUser(payload)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      )
    }
  }
)

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await userService.loginUser(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong during login"
      );
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (payload, thunkAPI) => {
    try {
      const { data } = await userService.updateProfile(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong during profile update"
      );
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userDetails = {
        userName: null,
        userId: null,
        email: null,
        userProfilePhoto: null,
      };
      state.isLogged = false;
      state.role = null;
      state.cart = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== REGISTER ==========
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = {
          userName: action.payload.userName,
          userId: action.payload.userId,
          email: action.payload.email,
          userProfilePhoto: action.payload.userProfilePhoto,
        };
        state.role = action.payload.role || "user";
        state.isLogged = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ========== LOGIN ==========
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = {
          userName: action.payload.userName,
          userId: action.payload.userId,
          email: action.payload.email,
          userProfilePhoto: action.payload.userProfilePhoto,
        };
        state.role = action.payload.role || "user";
        state.isLogged = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ========== UPDATE PROFILE ==========
      .addCase(updateProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        
        state.userDetails = {
          ...state.userDetails,
          ...action.payload, 
        };
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});





export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
