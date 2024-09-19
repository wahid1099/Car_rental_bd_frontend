import { baseApi } from "../../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (bookingInfo) => ({
        url: "/bookings",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["booking"],
    }),
    getMyBookings: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    updateBookingStatus: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/update-booking-status/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["booking"],
    }),
    deleteBooking: builder.mutation({
      query: (bookingId) => {
        console.log(bookingId);
        return {
          url: `/bookings/delete-booking/${bookingId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["booking"],
    }),
    updateBooking: builder.mutation({
      query: (payload) => {
        return {
          url: `/bookings/update-booking/${payload.bookingId}`,
          method: "PATCH",
          body: payload.bookingData,
        };
      },
      invalidatesTags: ["booking"],
    }),
    carReturnAndWithPayment: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/complete-booking/${bookingId}`,
        method: "POST",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});
