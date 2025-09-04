import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

export const sendMessage = createAsyncThunk('messages/sendMessage',
  async ({receiverId, content}, { rejectWithValue }) => {
    try {
      const response = await API.post('/messages', { receiverId, content });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchConversation = createAsyncThunk('messages/fetchConversation',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/messages/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMessages = createAsyncThunk('messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/messages');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    conversation: [],
    inbox: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.inbox = [...state.inbox, action.payload];
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.conversation = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.inbox = action.payload;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.msg : action.error.message;
      });
  }
});

export default messagesSlice.reducer;
