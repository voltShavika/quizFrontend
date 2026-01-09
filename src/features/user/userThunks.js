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
    async ({ quizId, answers }, { rejectWithValue }) => {
        try {
            const res = await api.post(`/quiz/${quizId}/submit`, { answers });
            if(!res.data.status) return rejectWithValue(res.data.message);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to submit quiz");
        }
    }
);

// Get leaderboard
export const getLeaderboard = createAsyncThunk("user/getLeaderboard",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/quiz/leaderboard");
            if(!res.data.status) return rejectWithValue(res.data.message);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch leaderboard");
        }
    }
);
