import { createSlice } from "@reduxjs/toolkit";

const infoRestaurant = createSlice({
  name: "restaurant",
  initialState: {
    data: [],
    freeTrails: null,
    socialLinks: [],
  },
  reducers: {
    setRestaurantData: (state, action) => {
      state.data = action.payload.restaurant;
    },
    setFreeTrails: (state, action) => {
      if (action.payload.userFound.subscriptionType == "free_trial") {
        state.freeTrails = action.payload.daysLeft;
      } else {
        state.freeTrails = action.payload.userFound.subscriptionType;
      }
    },
    updateRestaurantLogo: (state, action) => {
      state.data.logo = action.payload.logo;
      state.data.cover = action.payload.cover;
    },
    setBillingTrail: (state, action) => {
      if (action.payload) {
        state.freeTrails = action.payload;
      }
    },
    setSocialLinks: (state, action) => {
      state.socialLinks = action.payload;
    },
  },
});

export const {
  setRestaurantData,
  updateRestaurantLogo,
  setFreeTrails,
  setBillingTrail,
  setSocialLinks,
} = infoRestaurant.actions;
export default infoRestaurant.reducer;
