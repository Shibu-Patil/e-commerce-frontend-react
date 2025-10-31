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

export const userSlice=createSlice({
    name:"user",
    initialState:initalState,
    reducers:{

    }
})

export let {} =userSlice.actions
export default userSlice.reducer