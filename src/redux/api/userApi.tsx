import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../../core/constant/endpoints";
import { baseQueryConfig } from "./BaseQueryConfig";
import { User } from "../../core/models/user.model";
import { UserDetails, UsersDetails } from "core/models/UserDetails.model";
import { Message } from "core/models/Message.model";
import { SendMessageRequest } from "core/models/sendMessageRequest.model";



export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery(baseQueryConfig),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page) => `${endpoints.USERS}?page=${page}`,
      providesTags: ["User"],
    }),
    verifiedUsers: builder.query<any, void>({
      query: () => `${endpoints.VERIFIEDUSERS}`,
      providesTags: ["User"],
    }),
    setAdmin: builder.mutation({
      query: (id) => {
        return {
          url: endpoints.SETADMIN + id,
          method: "put",
        };
      },
      invalidatesTags: ["User"],
    }),
    revokeAdmin: builder.mutation({
      query: (id) => {
        return {
          url: endpoints.REVOKEADMIN + id,
          method: "put",
        };
      },
      invalidatesTags: ["User"],
    }),
    userDetails: builder.query<UserDetails, string | undefined>({
      query: (id) => {
        return {
          url: endpoints.USERDETAILS + id,
          method: "get",
        };
      },
      providesTags: ["User"],
    }),
    listAllNotifications: builder.query<any, string | undefined>({
      query: (id) => {
        return {
          url: endpoints.USERLISTNOTIFICATIONS + id,
          method: "get",
        };
      },
      providesTags: ["User"],
    }),
    listUnreadNotifications: builder.query<any, string | undefined>({
      query: (id) => {
        return {
          url: endpoints.USERLISTUNREADNOTIFICATIONS + id,
          method: "get",
        };
      },
      providesTags: ["User"],
    }),
    markAllAsReadNotifications: builder.mutation<any, void>({
      query: () => {
        return {
          url: endpoints.MARKAllASREADNOTIFICATIONS,
          method: "post",
        };
      },
      invalidatesTags: ["User"],
    }),
    sendMessage: builder.mutation<any, SendMessageRequest>({
      query: ({ receiver_id, message }) => ({
        url: endpoints.MESSAGES + receiver_id,
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: ['User'],
    }),
    getConversation: builder.query({
      query: (user_id ) => ({
        url: endpoints.CONVERSATION + user_id,
        method: 'get',
      }),
      providesTags: ['User'],
    }),
    getListConversations: builder.query<Message[], void>({
      query: ( ) => ({
        url: endpoints.CONVERSATIONSLIST,
        method: 'get',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useVerifiedUsersQuery,
  useSetAdminMutation,
  useRevokeAdminMutation,
  useUserDetailsQuery,
  useListAllNotificationsQuery,
  useListUnreadNotificationsQuery,
  useMarkAllAsReadNotificationsMutation,
  useSendMessageMutation,
  useGetConversationQuery,
  useGetListConversationsQuery
} = userApi;
