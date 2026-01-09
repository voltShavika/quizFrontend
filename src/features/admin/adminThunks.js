import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Create a new quiz
export const createQuiz = createAsyncThunk("admin/createQuiz",
    async (quizData, { rejectWithValue }) => {
        try {
            const res = await api.post("/quiz/create", quizData);
            if(!res.data.status) return rejectWithValue(res.data.message);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create quiz");
        }
    }
);
