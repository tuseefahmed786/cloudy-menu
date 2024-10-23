// menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menuData: [],
        loading: false,
    },
    reducers: {
        setMenuData: (state, action) => {
            state.menuData = action.payload;
        },
    },
});

export const { setMenuData } = menuSlice.actions;
export default menuSlice.reducer;
