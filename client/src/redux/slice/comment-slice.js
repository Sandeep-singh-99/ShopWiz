import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AddComment = createAsyncThunk('comment/addComment', async ({ id, data}, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:5000/api/comment/add-comment', {id, data}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})

export const GetComments = createAsyncThunk('comment/getComments', async (_, thunkApi) => {
    try {
        const response = await axios.get('http://localhost:5000/api/comment/view-comment')
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
})

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comment: [],
        isError: false,
        data: null,
        isLoading: false
    },

    extraReducers: (builder) => {
        builder.addCase(AddComment.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })

        builder.addCase(AddComment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })

        builder.addCase(AddComment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })

        builder.addCase(GetComments.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })

        builder.addCase(GetComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comment = action.payload;
        })

        builder.addCase(GetComments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default commentSlice.reducer;