import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


// Thunk to fetch menu data
export const fetchMenuApi = createAsyncThunk('menu/fetchMenu', async (api,{ rejectWithValue }) => {
const UserId = localStorage.getItem('token');
try {
  const response = await axios.get(api, {
    headers: {
      Authorization: `${UserId}`,
    },
  });
  console.log(response.data)
  return response.data;
} catch (error) {
  console.log(error.response.data.message)
  rejectWithValue(error.message);
}
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
    fetched:false,
  },
  reducers: {
    // Add a new category
    addCategory: (state, action) => {
      state.categories.push(action.payload);
      state.selectedCategory = action.payload;
    },
    // Edit an existing category
    editCategories: (state, action) => {
      const updatedCategory = action.payload;
      state.categories = state.categories.map((category) =>
        category._id === updatedCategory._id
          ? { ...updatedCategory, products: category.products }
          : category
      );
      state.selectedCategory = updatedCategory;
    },
    // Delete a category
    deleteCategory: (state, action) => {
      const categoryId = action.payload;
      state.categories = state.categories.filter((category) => category._id !== categoryId);
      state.selectedCategory = state.categories.length > 0 ? state.categories[0] : null;
    },
    // Add a new product to the selected category
    addProduct: (state, action) => {
      const newProduct = action.payload;
      if (state.selectedCategory) {
        state.selectedCategory.products.push(newProduct);
        state.categories = state.categories.map((category) =>
          category._id === state.selectedCategory._id
            ? { ...category, products: [...category.products, newProduct] }
            : category
        );
      }
    },
    // Edit a product in the selected category
    editProducts: (state, action) => {
      const updatedProduct = action.payload;
      if (state.selectedCategory) {
        state.selectedCategory.products = state.selectedCategory.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        state.categories = state.categories.map((category) =>
          category._id === state.selectedCategory._id
            ? {
                ...category,
                products: category.products.map((product) =>
                  product._id === updatedProduct._id ? updatedProduct : product
                ),
              }
            : category
        );
      }
    },
    // Delete a product from the selected category
    deleteProduct: (state, action) => {
      const productId = action.payload;
      if (state.selectedCategory) {
        state.selectedCategory.products = state.selectedCategory.products.filter(
          (product) => product._id !== productId
        );
        state.categories = state.categories.map((category) =>
          category._id === state.selectedCategory._id
            ? {
                ...category,
                products: category.products.filter((product) => product._id !== productId),
              }
            : category
        );
      }
    },
    // Set the selected category
    selectCategory: (state, action) => {
      const categoryId = action.payload._id;
      state.selectedCategory =
        state.categories.find((category) => category._id === categoryId) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuApi.fulfilled, (state, action) => {
        state.loading = false;
          state.categories = action.payload;
          state.selectedCategory = action.payload.length > 0 ? action.payload[0] : null;
          state.fetched = true
      })
      .addCase(fetchMenuApi.rejected, (state, action) => {
        state.loading = false;
        state.categories = []
        state.selectedCategory = null
        console.log(action.payload);
        state.error = action.error.message;
      });
  },
});

export const {
  addCategory,
  editCategories,
  deleteCategory,
  addProduct,
  editProducts,
  deleteProduct,
  selectCategory,
} = menuSlice.actions;

export default menuSlice.reducer;


// // Redux slice (menuSlice.js)
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../axios'
// const UserId = localStorage.getItem('token')

// // Thunk to fetch menu data
// export const fetchMenuApi = createAsyncThunk('menu/fetchMenu', async (api) => {
//   console.log(UserId)
//   const response = await axios.get(api,{
//     headers:{
//       'Authorization': `${UserId}`
//     }
//   }); // Replace with your API endpoint
//   console.log(response)
//   return response.data;

// });

// const menuSlice = createSlice({
//   name: 'menu',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // Additional reducers for handling other actions like add, edit, delete
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMenuApi.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMenuApi.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchMenuApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { actions } = menuSlice;
// export default menuSlice.reducer;
