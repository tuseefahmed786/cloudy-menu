// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import infoRestaurant from "../slice/infoSlice"
const store = configureStore({
  reducer: {
    info: infoRestaurant,
  },
});

export default store;
