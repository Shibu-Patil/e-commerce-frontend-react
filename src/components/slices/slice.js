import { createSlice } from "@reduxjs/toolkit";

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

export const userSlice=createSlice({
    name:"user",
    initialState:initalState,
    reducers:{

    }
})

export let {} =userSlice.actions
export default userSlice.reducer