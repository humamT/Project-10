import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    isLoading: false,
    error: null,
    token: null,
};

// Create an async thunk
export const getData = createAsyncThunk("getData", async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error("Error fetching data");
    }
});

// Create an async thunk
export const login = createAsyncThunk("login", async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error("Error fetching data");
    }
});

// Create an async thunk
export const modify = createAsyncThunk("modify", async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error("Error modify data");
    }
});


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            state.data = null
        }
    },
    extraReducers: {
        [getData.pending]: (state) => {
            state.isLoading = true;
        },
        [getData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [getData.error]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    },
});

export default userSlice.reducer;