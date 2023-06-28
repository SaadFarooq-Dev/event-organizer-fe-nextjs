import { apiSlice } from "../api/apiSlice";
import { Query_Endpoint } from "@/assets/Constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (token: string) => ({
        url: Query_Endpoint.allUsers,
        headers: {
          "x-auth-token": token,
        },
      }),
    }),
    getUser: builder.query({
      query: ({ userId, token }) => ({
        url: `${Query_Endpoint.user}/${userId}`,
        headers: {
          "x-auth-token": token,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userInfo, token }) => {
        return {
          url: Query_Endpoint.editUser,
          method: "PATCH",
          body: userInfo,
          headers: {
            "x-auth-token": token,
          },
        };
      },
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery, useUpdateUserMutation } =
  userApiSlice;
