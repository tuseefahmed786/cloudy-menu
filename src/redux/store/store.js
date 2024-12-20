// src/redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import infoRestaurant from "../slice/infoSlice"
import perProductSlice from '../slice/selectedProductSlice'
import menuReducer from '../slice/menuSlice'; // Make sure the path is correct
import menuSlices from '../slice/fetchMenuForEdit'
import fetchIconsSlice from '../slice/fetchIconsCategory';
// Combine all reducers
const appReducer = combineReducers({
  info: infoRestaurant,
  perProductDetails: perProductSlice,
  menuSlice: menuReducer,
  fetchMenuForEdit: menuSlices,
  fetchAllIcons: fetchIconsSlice,
});

// Create a root reducer to handle global state reset
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    // Reset all slices by returning undefined
    state = undefined;
  }
  return appReducer(state, action);
};

// Configure store with the root reducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;
