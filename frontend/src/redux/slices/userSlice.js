import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

export const searchUsers = createAsyncThunk('user/searchUsers',
    async (query, { rejectWithValue }) => {
        try {
            const res = await API.get(`/users/search?q=${query}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Searching users failed' });
        }
    }
);

export const getUserByUsername = createAsyncThunk('user/getUserByUsername',
    async (username, { rejectWithValue }) => {
        try {
            const res = await API.get(`/users/${username}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Fetching user failed' });
        }
    }
);

export const fetchFriends = createAsyncThunk('user/fetchFriends',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('/users/friends');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Fetching friends failed' });
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        users: [],
        friends: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Error';
            })
            .addCase(getUserByUsername.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserByUsername.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Error';
            })
            .addCase(fetchFriends.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFriends.fulfilled, (state, action) => {
                state.loading = false;
                state.friends = action.payload;
            })
            .addCase(fetchFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Error';
            });
    }
});

export default userSlice.reducer;
