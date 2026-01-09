import { createSlice } from "@reduxjs/toolkit";
import { fetchQuizzes, fetchQuizById, submitQuiz, getLeaderboard } from "./userThunks";

const userSlice = createSlice({
    name: "user",
    initialState: {
        quizzes: [],
        currentQuiz: null,
        quizResult: null,
        leaderboard: [],
        loading: false,
        error: null
    },
    reducers: {
        clearCurrentQuiz(state) {
            state.currentQuiz = null;
            state.quizResult = null;
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        // Fetch Quizzes
        .addCase(fetchQuizzes.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchQuizzes.fulfilled, (state, action) => {
            state.loading = false;
            state.quizzes = action.payload;
        })
        .addCase(fetchQuizzes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Fetch Quiz By ID
        .addCase(fetchQuizById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchQuizById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentQuiz = action.payload;
        })
        .addCase(fetchQuizById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Submit Quiz
        .addCase(submitQuiz.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(submitQuiz.fulfilled, (state, action) => {
            state.loading = false;
            state.quizResult = action.payload;
        })
        .addCase(submitQuiz.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Get Leaderboard
        .addCase(getLeaderboard.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getLeaderboard.fulfilled, (state, action) => {
            state.loading = false;
            state.leaderboard = action.payload;
        })
        .addCase(getLeaderboard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { clearCurrentQuiz, clearError } = userSlice.actions;
export default userSlice.reducer;
