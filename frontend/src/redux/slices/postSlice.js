import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

export const createPost = createAsyncThunk('post/createPost',
    async (postData, { rejectWithValue }) => {
        try {
            const response = await API.post('/posts', postData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchFeed = createAsyncThunk('post/fetchFeed',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/posts/feed');
            console.log("Posts", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchPostById = createAsyncThunk('post/fetchPostById',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await API.get(`/posts/${postId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        currentPost: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = [...state.posts, action.payload];
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchFeed.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFeed.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload || [];
            })
            .addCase(fetchFeed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPostById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPost = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default postSlice.reducer;