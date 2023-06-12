import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Ad,AdData } from "core/models/ad.model";

const initialState = {
  ad: {} as AdData,
};

export const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    getAds: (state, action) => {
      state.ad = action.payload;
    },
    listfavoritAds: (state, action) => {
        state.ad = action.payload;
      },
      toggleFavoritAd: (state, action) => {
        state.ad = action.payload;
      }, 

  },
});
export const selectAd = (state: RootState) => state.ad.ad;
export const { getAds,toggleFavoritAd, listfavoritAds } = adSlice.actions;
export default adSlice.reducer
