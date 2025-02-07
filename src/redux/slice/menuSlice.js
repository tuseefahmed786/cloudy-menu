// menuSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchMenuUser = createAsyncThunk(
  "menu/fetch",
  async (restaurantName, { rejectWithValue }) => {
  console.log(restaurantName)
    try {
      const response = await axios.get(`/menu/${restaurantName}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuData: [],
    restaurantData: [],
    socialLink: [],
    loading: false,
  },
  reducers: {
    setMenuData: (state, action) => {
      console.log(action.payload)
    
      state.menuData = action.payload.getcatandProducts;
      state.restaurantData = action.payload.findrestaurant;
      state.socialLink = action.payload.socialLink;
    },
    setMenuCategory: (state, action) => {
      state.menuData.push(action.payload);
    },
    setMenuEditCategory: (state, action) => {
      const updatedCategory = action.payload;

      state.menuData = state.menuData.map((category) =>
        category._id === updatedCategory._id
          ? { ...updatedCategory, products: category.products }
          : category
      );
    },
    deleteCategoryMenu: (state, action) => {
      const categoryId = action.payload;
      state.menuData = state.menuData.filter(
        (category) => category._id !== categoryId
      );
    },
    addProductMenu: (state, action) => {
      const newProduct = action.payload.product;
      const categoryId = action.payload.id;

      state.menuData = state.menuData.map((category) =>
        category._id === categoryId
          ? { ...category, products: [...category.products, newProduct] }
          : category
      );
    },
    editProductsMenu: (state, action) => {
      const updatedProduct = action.payload.product;
      const categoryId = action.payload.id;
      state.menuData = state.menuData.map((category) =>
        category._id === categoryId
          ? {
              ...category,
              products: category.products.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
              ),
            }
          : category
      );
    },
    deleteProductMenu: (state, action) => {
      const productId = action.payload.productId;
      const categoryId = action.payload.categoryId;
      console.log(categoryId);
      console.log(productId);

      state.menuData = state.menuData.map((category) =>
        category._id === categoryId
          ? {
              ...category,
              products: category.products.filter(
                (product) => product._id !== productId
              ),
            }
          : category
      );
    },
    updateLogoMenu: (state, action) => {
      state.restaurantData.logo = action.payload.logo;
      state.restaurantData.cover = action.payload.cover;
    },
    updateRestaurantInfo: (state, action) => {
      state.restaurantData.about = action.payload.about;
      state.restaurantData.location = action.payload.location;
      state.restaurantData.name = action.payload.name;
      state.restaurantData.currency = action.payload.currency
    },
    updateSocialLinks: (state, action) => {
      const { facebookLink, googleMapLink, instagramLink, whatsappLink } =
        action.payload;
      state.socialLink = {
        facebookLink,
        googleMapLink,
        instagramLink,
        whatsappLink,
      };
    },
  },

});

export const {
  setMenuData,
  setMenuCategory,
  setMenuEditCategory,
  deleteCategoryMenu,
  addProductMenu,
  editProductsMenu,
  deleteProductMenu,
  updateLogoMenu,
  updateRestaurantInfo,
  updateSocialLinks,
} = menuSlice.actions;
export default menuSlice.reducer;
