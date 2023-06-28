import { apiSlice } from "../api/apiSlice";
import { Query_Endpoint } from "@/assets/Constants";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: (token: string) => ({
        url: Query_Endpoint.allEvents,
        headers: {
          "x-auth-token": token,
        },
      }),
    }),
    getEvent: builder.query({
      query: ({ eventId, token }) => ({
        url: `${Query_Endpoint.event}/${eventId}`,
        headers: {
          "x-auth-token": token,
        },
      }),
    }),
    getUserEvent: builder.query({
      query: (token) => ({
        url: Query_Endpoint.userEvents,
        headers: {
          "x-auth-token": token,
        },
      }),
      providesTags: ["Events"],
    }),
    getUserJoinedEvent: builder.query({
      query: (token) => ({
        url: Query_Endpoint.userJoinedEvents,
        headers: {
          "x-auth-token": token,
        },
      }),
    }),
    updateEvent: builder.mutation({
      query: ({ eventInfo, token, eventId }) => ({
        url: `${Query_Endpoint.editEvent}/${eventId}`,
        method: "PATCH",
        body: eventInfo,
        headers: {
          "x-auth-token": token,
        },
      }),
      invalidatesTags: ["Events"],
    }),
    attendEvent: builder.mutation({
      query: ({ eventId, token }) => ({
        url: `${Query_Endpoint.attendEvent}/${eventId}/attendee`,
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventQuery,
  useUpdateEventMutation,
  useAttendEventMutation,
  useGetUserEventQuery,
  useGetUserJoinedEventQuery,
} = eventApiSlice;
