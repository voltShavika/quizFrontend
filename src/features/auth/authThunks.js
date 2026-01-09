import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser = createAsyncThunk("auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", payload);
            if(!res.data.status) return rejectWithValue(res.data.message);

            localStorage.setItem("token", res.data.data.access_token);
            return res.data.data.access_token;
        } catch(err){
            return rejectWithValue("Login failed");
        }
    }
);

export const signupUser = createAsyncThunk("auth/signup", 
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/signup", payload);
            if (!res.data.status) return rejectWithValue(res.data.message);
            return true;
        } catch {
            return rejectWithValue("Registration failed");
        }
    }
);