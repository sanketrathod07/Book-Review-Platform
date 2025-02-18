import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user profile (GET /users/me)
export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (id, thunkAPI) => {
    if (!id) {
        return thunkAPI.rejectWithValue("User ID is required");
    }
    const token = localStorage.getItem("token");
    if (token) {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } else {
        return thunkAPI.rejectWithValue("No token found");
    }
});



// Update user profile (PUT /users/me)
export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async ({ updatedData, id }, thunkAPI) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/users/${id}`,
                updatedData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



// Existing actions for login and registration
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, userData);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));  // Store user data as well
            return response.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, userData);
            return response.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null; // Clear user state on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logoutUser } = userSlice.actions; // Export the logout action
export default userSlice.reducer;
