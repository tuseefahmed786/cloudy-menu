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
      const { userFound } = action.payload;
    
      if (userFound.subscriptionType === "free_trial") {
        const now = new Date();
        const trialExpiresAt = new Date(userFound.trialExpiresAt);
    
        // Calculate remaining days
        if (trialExpiresAt >= now) {
          const daysLeft = Math.ceil((trialExpiresAt - now) / (1000 * 60 * 60 * 24));
          state.freeTrails = daysLeft;
        } else {
          state.freeTrails = "expiry";
        }
      } else {
        state.freeTrails = userFound.subscriptionType;
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
      state.socialLinks = action.payload || [];
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
