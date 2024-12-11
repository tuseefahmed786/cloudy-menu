import { createSlice } from "@reduxjs/toolkit";

const infoRestaurant = createSlice({
    name: 'restaurant',
    initialState: {
        data: [],
        freeTrails: null
    },
    reducers: {
        setRestaurantData: (state, action) => {
            state.data = action.payload.restaurant
        },
        setFreeTrails: (state, action) => {
            if (action.payload.userFound.subscriptionType == "free_trial") {
                state.freeTrails = action.payload.daysLeft
            } else {
                console.log(action.payload)
                state.freeTrails = action.payload.userFound.subscriptionType
            }
        },
        updateRestaurantLogo: (state, action) => {
            if (state.data && state.data._id === action.payload.id) {
                state.data.logo = action.payload.logo;
            }
        },
        setBillingTrail:(state, action)=>{
            console.log(action.payload)
            if (action.payload) {
                state.freeTrails = action.payload
            } 
        }
    }
})

export const { setRestaurantData, updateRestaurantLogo, setFreeTrails,setBillingTrail } = infoRestaurant.actions
export default infoRestaurant.reducer