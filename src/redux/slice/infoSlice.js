import { createSlice } from "@reduxjs/toolkit";

const infoRestaurant = createSlice({
    name: 'restaurant',
    initialState: {
        data: []
    },
    reducers: {
        setRestaurantData: (state, action) => {
            state.data = action.payload
        },
        updateRestaurantLogo: (state, action) => {
            if (state.data && state.data._id === action.payload.id) {
              state.data.logo = action.payload.logo;
            }
        }
    }
})

export const { setRestaurantData,updateRestaurantLogo } = infoRestaurant.actions
export default infoRestaurant.reducer