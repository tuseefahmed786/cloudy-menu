// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import infoRestaurant from "../slice/infoSlice"
import perProductSlice from '../slice/selectedProductSlice'
import menuReducer from '../slice/menuSlice'; // Make sure the path is correct
import menuSlices from '../slice/fetchMenuForEdit'
import fetchIconsSlice from '../slice/fetchIconsCategory';
const store = configureStore({
  reducer: {
    info: infoRestaurant,
    perProductDetails: perProductSlice,
    menuSlice: menuReducer,
    fetchMenuForEdit:menuSlices,
    fetchAllIcons:fetchIconsSlice
  },
});

export default store;
