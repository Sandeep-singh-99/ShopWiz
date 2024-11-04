import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
})

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        data: null,
        isError: false
    },

    extraReducers: (builder) => [
        builder.addCase(login.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false
            state.isError = false
        }),

        builder.addCase(login.pending, (state, action) => {
            state.loading = true

        }),

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.isError = true
        }),

        builder.addCase(register.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false
            state.isError = false
        }),

        builder.addCase(register.pending, (state, action) => {
            state.loading = true
        }),

        builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.isError = true
        })
    ]
})

export default authSlice.reducer;