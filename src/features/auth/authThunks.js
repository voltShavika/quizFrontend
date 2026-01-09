import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser = createAsyncThunk("auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", payload);
            console.log(res.data);
            if(!res.data.status) return rejectWithValue(res.data.message);

            const token = res.data.data.access_token;
            const user = res.data.data.user || {};
            const role = res.data.data.role || "user";
            
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            
            return { token, user, role };
        } catch {
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