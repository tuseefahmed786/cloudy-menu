import { createSlice } from "@reduxjs/toolkit";

const perProductSlice = createSlice({
    name: 'productDetails',
    initialState: {
        data: []
      },
    reducers: {
        setProductDetails: (state, action) => {
            state.product = action.payload;
        },
        clearProductDetails: (state) => {
            state.product = null;
        }
    }
})

export const {setProductDetails, clearProductDetails} = perProductSlice.actions 
export default perProductSlice.reducer