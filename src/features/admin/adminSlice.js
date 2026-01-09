import { createSlice } from "@reduxjs/toolkit";
import { createQuiz } from "./adminThunks";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        error: null,
        success: null
    },
    reducers: {
        clearAlert(state) {
            state.error = null;
            state.success = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createQuiz.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        .addCase(createQuiz.fulfilled, (state) => {
            state.loading = false;
            state.success = "Quiz created successfully";
        })
        .addCase(createQuiz.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { clearAlert } = adminSlice.actions;
export default adminSlice.reducer;
