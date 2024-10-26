// Redux slice (menuSlice.js)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const UserId = localStorage.getItem('token')

// Thunk to fetch menu data
export const fetchMenuApi = createAsyncThunk('menu/fetchMenu', async (api) => {
  console.log(UserId)
  const response = await axios.get(api,{
    headers:{
      'Authorization': `${UserId}`
    }
  }); // Replace with your API endpoint
  console.log(response)
  return response.data;

});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Additional reducers for handling other actions like add, edit, delete
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuApi.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenuApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { actions } = menuSlice;
export default menuSlice.reducer;
