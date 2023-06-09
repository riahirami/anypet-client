import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryData } from "../../core/models/category.model";
import { RootState } from "../store";

const initialState = {
  categories: {} as CategoryData,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    getCategories: (
      state,
      action: PayloadAction<{ category: CategoryData }>
    ) => {
      // state.categories = action.payload.category.data;
    },
  },
});
export const selectCategory = (state: RootState) => state.category.categories;
export const { getCategories,setCategories } = categorySlice.actions;
export default categorySlice.reducer
