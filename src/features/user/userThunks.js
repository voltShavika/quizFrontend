import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch all quizzes for user
export const fetchQuizzes = createAsyncThunk("user/fetchQuizzes",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/quiz");
            if(!res.data.status) return rejectWithValue(res.data.message);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch quizzes");
        }
    }
);

// Fetch quiz details by ID
export const fetchQuizById = createAsyncThunk("user/fetchQuizById",
    async (quizId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/quiz/${quizId}`);
            if(!res.data.status) return rejectWithValue(res.data.message);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch quiz");
        }
    }
);

// Submit quiz attempt
export const submitQuiz = createAsyncThunk("user/submitQuiz",
    async ({ quiz_id, answers }, { rejectWithValue }) => {
        try {
            console.log("Submitting attempt:", { quiz_id, answers });
            const res = await api.post(`/attempt`, { quiz_id, answers });
            console.log("Submit response:", res.data);
            if(!res.data.status) return rejectWithValue(res.data.message);
            return res.data.data;
        } catch (error) {
            console.error("Submit error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Failed to submit quiz");
        }
    }
);

// Get leaderboard
export const getLeaderboard = createAsyncThunk("user/getLeaderboard",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/leaderboard");
            console.log("Leader board api called", res.data);
            if(!res.data.status) return rejectWithValue(res.data.message);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch leaderboard");
        }
    }
);
