import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

export const registerUser = createAsyncThunk('auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await API.post('/auth/register', userData);
            return res.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Register failed' })
        }
    }
);

export const loginUser = createAsyncThunk('auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await API.post('/auth/login', userData);
            return res.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Login failed' })
        }
    }
);

export const fetchProfile = createAsyncThunk('user/fetchProfileProfile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('/users/me');
            // console.log("User:", res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Fetching profile failed' });
        }
    }
);

export const updateProfile = createAsyncThunk('user/updateProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await API.put('/users/me', userData);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Updating profile failed' });
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message || 'Register failed';
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
                localStorage.setItem('token', payload.token);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message || 'Login failed';
            })
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Error';
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Error';
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
