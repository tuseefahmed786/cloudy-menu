// Redux slice (menuSlice.js)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

// Thunk to fetch menu data
export const fetchIcons = createAsyncThunk('menu/icons', async (api) => {
  const response = await axios.get(api); // Replace with your API endpoint
  return response.data;
});

const fetchIconsSlice = createSlice({
  name: 'allIconsCategory',
  initialState: {
    icons: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Additional reducers for handling other actions like add, edit, delete
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIcons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIcons.fulfilled, (state, action) => {
        state.loading = false;
        state.icons = action.payload;
      })
      .addCase(fetchIcons.rejected, (state, action) => {
        state.loading = false;
        state.categories = []; // or set to a default value if needed
        state.selectedCategory = null;
        state.error = action.error.message;
      });
  },
});

export const { actions } = fetchIconsSlice;
export default fetchIconsSlice.reducer;
