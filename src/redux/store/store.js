// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import infoRestaurant from "../slice/infoSlice"
import perProductSlice from '../slice/selectedProductSlice'
import menuReducer from '../slice/menuSlice'; // Make sure the path is correct

const store = configureStore({
  reducer: {
    info: infoRestaurant,
    perProductDetails: perProductSlice,
    menuSlice: menuReducer
  },
});

export default store;
