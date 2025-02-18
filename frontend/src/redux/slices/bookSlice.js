import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/books`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch books");
        }
    }
);

const bookSlice = createSlice({
    name: "books",
    initialState: { books: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload || []; // Ensure books is always an array
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store the error message
            });
    },
});

export default bookSlice.reducer;
