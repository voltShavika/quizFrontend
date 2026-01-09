import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authThunks";

const token = localStorage.getItem("token");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token,
        user: null,
        role: localStorage.getItem("role") || null,
        loading: false,
        error: null,
        success: null
    },
    reducers: {
        logout(state) {
            localStorage.clear();
            state.token = null;
            state.user = null;
            state.role = null;
        },
        clearAlert(state) {
            state.error = null;
            state.success = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        }) 
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(signupUser.pending, (state) => {
            state.loading = true;
        }) 
        .addCase(signupUser.fulfilled, (state) => {
            state.loading = false;
            state.success = "Registration successful";
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { logout, clearAlert } = authSlice.actions;
export default authSlice.reducer;