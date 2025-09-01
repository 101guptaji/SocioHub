import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

export const sendFriendRequest = createAsyncThunk('friend/sendFriendRequest', 
    async (toUserId, {rejectWithValue}) => {
    try {
        const response = await API.post(`/friends/requests`, { toUserId });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const listRequests = createAsyncThunk('friend/listRequests', 
    async (_, {rejectWithValue}) => {
    try {
        const response = await API.get(`/friends/requests`);
        // console.log("Requests", response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const acceptFriendRequest = createAsyncThunk('friend/acceptFriendRequest', 
    async (requestId, {rejectWithValue}) => {
    try {
        const response = await API.post(`/friends/requests/${requestId}/accept`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const rejectFriendRequest = createAsyncThunk('friend/rejectFriendRequest', 
    async (toUserId, {rejectWithValue}) => {
    try {
        const response = await API.post(`/friends/requests/${toUserId}/reject`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const unfriend = createAsyncThunk('friend/unfriend', 
    async (friendId, {rejectWithValue}) => {
    try {
        const response = await API.delete(`/friends/${friendId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        friends: [],
        incomingRequests: [],
        outgoingRequests: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendFriendRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.friends = [...state.friends, action.payload];
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(listRequests.pending, (state) => {
                state.loading = true;
            })
            .addCase(listRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.incomingRequests = action.payload?.incoming || [];
                state.outgoingRequests = action.payload?.outgoing || [];
            })
            .addCase(listRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(acceptFriendRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.friends = [...state.friends, action.payload];
            })
            .addCase(acceptFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(rejectFriendRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(rejectFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.friends = state.friends.filter(friend => friend.id !== action.payload.id);
            })
            .addCase(rejectFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(unfriend.pending, (state) => {
                state.loading = true;
            })
            .addCase(unfriend.fulfilled, (state, action) => {
                state.loading = false;
                state.friends = state.friends.filter(friend => friend.id !== action.payload.id);
            })
            .addCase(unfriend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default friendsSlice.reducer;
