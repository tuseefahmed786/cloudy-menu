import { createSlice } from "@reduxjs/toolkit";

const infoRestaurant = createSlice({
    name: 'restaurant',
    initialState: {
        data: []
      },
    reducers: {
        setRestaurantData: (state, action) => {
            console.log(state.data)
            state.data = action.payload
        }
    }
})

export const {setRestaurantData} = infoRestaurant.actions 
export default infoRestaurant.reducer