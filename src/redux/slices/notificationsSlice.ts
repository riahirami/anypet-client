import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import { adsApi } from '../api/adsApi';
import { endpoints } from 'core/constant/endpoints';
import { commentApi } from "redux/api/commentsApi";
import { reservationApi } from "redux/api/reservationApi";
import { userApi } from "redux/api/userApi";

interface Notifications {
  notificationsList: Notification[];
}

const initialState: Notifications = {
  notificationsList: [],
};
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    updateNotifications: (state, action: PayloadAction<Notification[]>) => {
      const notif = action.payload;
      state.notificationsList = notif;

    },
  },
  extraReducers: (builder) => {
    //  builder.addMatcher(
    //   commentApi.endpoints.replyComments.matchFulfilled,
    //   (state, action) => {
    //     const notification = action.payload;
    //     state.notificationsList = [...state.notificationsList, notification];
    //   }
    // );
    // builder.addMatcher(
    //   commentApi.endpoints.addComments.matchFulfilled,
    //   (state, action) => {
    //     const notification = action.payload;
    //     state.notificationsList = [...state.notificationsList, notification];
    //   }
    // );
    // builder.addMatcher(
    //   reservationApi.endpoints.responseOnReservations.matchFulfilled,
    //   (state, action) => {
    //     const notification = action.payload;
    //     state.notificationsList = [...state.notificationsList, notification];
    //   }
    // );
    // builder.addMatcher(
    //   reservationApi.endpoints.createReservations.matchFulfilled,
    //   (state, action) => {
    //     const notification = action.payload;
    //     state.notificationsList = [...state.notificationsList, notification];
    //   }
    // );
    // builder.addMatcher(
    //   adsApi.endpoints.changeStatusAds.matchFulfilled,
    //   (state, action) => {
    //     const notification = action.payload;
    //     state.notificationsList = [...state.notificationsList, notification];
    //   }
    // );
  },
});

export const { updateNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
