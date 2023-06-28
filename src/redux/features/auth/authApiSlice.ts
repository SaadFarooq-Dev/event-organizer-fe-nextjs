import { apiSlice } from "../api/apiSlice";
import { Query_Endpoint } from "@/assets/Constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: Query_Endpoint.login,
        method: "POST",
        body: userInfo,
      }),
    }),
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: Query_Endpoint.register,
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApiSlice;
