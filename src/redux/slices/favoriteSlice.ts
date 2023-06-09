import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ad, AdData, MyAdData } from "../../core/models/ad.model";
import { ListFav } from "../../core/models/listFavorite.model";
import { RootState } from "../store";
import { adsApi } from "redux/api/adsApi";


interface Favorites {
  favoriteList: Ad[];
}

const initialState: Favorites = {
  favoriteList: [],
};
export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers:{},
    // reducers: {
    //     setFavoriteList: (state, action) => {
    //         state.favoriteList = action.payload;
    //     },
    //  toggleFavorite: (state, action) => {
    //   const ad = state.favoriteList.data.find(
    //     (favorite: Ad) => favorite.id === action.payload
    //   );

    //   if (ad) {
    //     state.favoriteList.data = state.favoriteList.data.filter(
    //       (favorite: Ad) => favorite.id !== ad.id
    //     );
    //   } else {
    //     const newAd = state.favoriteList.data.find(
    //       (favorite: Ad) => favorite.id === action.payload
    //     );

    //     if (newAd) {
    //       state.favoriteList.data.unshift(newAd);
    //     }
    //   }},
    // },
    extraReducers: (builder) => {
      builder.addMatcher(
        adsApi.endpoints.listFavorite.matchFulfilled,
        (state, action) => {
          state.favoriteList = action.payload;
        }
      );
      builder.addMatcher(
        adsApi.endpoints.setFavorite.matchFulfilled,
        (state, action) => {
          const adId = action.meta.arg;
          const adIndex = state.favoriteList.findIndex(
            (favorite: Ad) => favorite.id === adId.toString()
          );
  
          if (adIndex !== -1) {
            state.favoriteList.splice(adIndex, 1);
          } else {
            const adToAdd = state.favoriteList.find(
              (ad: Ad) => ad.id === adId.toString()
            );
  
            if (adToAdd) {
              state.favoriteList.unshift(adToAdd);
            }
          }
        }
      );
    },
    
    
});
export const selectFavorite = (state: RootState) => state.favorite;
//export const { setFavoriteList, toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer
