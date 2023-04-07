import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Attendee",
    "FeedBacks",
    "Attendees",
    "DataFinalists",
    "Events",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getAttendee: build.query({
      query: (id) => `general/attendee/${id}`,
      providesTags: ["Attendee"],
    }),
    getFeedBacks: build.query({
      query: () => "client/feedBacks",
      providesTags: ["FeedBacks"],
    }),
    getAttendees: build.query({ 
      query: () => "client/attendees",
      providesTags: ["Attendees"],
    }), 
    getDataFinalists: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/dataFinalists",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["DataFinalists"],
    }),
    
    getEvents: build.query({
      query: () => "events/events",
      providesTags: ["Events"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getAttendeePerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetAttendeeQuery,
  useGetFeedBacksQuery,
  useGetAttendeesQuery,
  useGetDataFinalistsQuery,
  useGetEventsQuery,
  useGetAdminsQuery,
  useGetAttendeePerformanceQuery,
  useGetDashboardQuery,
} = api;
