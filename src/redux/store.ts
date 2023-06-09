import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query/react";
import categoryReducer from "../redux/slices/categorySlice";
import { categoryApi } from './api/categoryApi';
import { authApi } from './api/authApi';
import { adsApi } from './api/adsApi';
import authReducer from "../redux/slices/authSlice" ; 
import adReducer from "../redux/slices/adsSlice" ; 
import favoriteReducer from "../redux/slices/favoriteSlice" ; 
import { commentApi } from './api/commentsApi';
import { userApi } from './api/userApi';
import { reservationApi } from './api/reservationApi';
import { partnerApi } from './api/partnerApi';



export const store = configureStore({
    reducer: {
        category: categoryReducer,
        auth:authReducer,
        ad:adReducer,
        favorite:favoriteReducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [adsApi.reducerPath]: adsApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [reservationApi.reducerPath]: reservationApi.reducer,
        [partnerApi.reducerPath]: partnerApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware).concat(partnerApi.middleware).concat(reservationApi.middleware).concat(categoryApi.middleware).concat(adsApi.middleware).concat(commentApi.middleware)


})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);