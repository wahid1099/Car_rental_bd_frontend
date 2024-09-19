import { baseApi } from "../../api/baseApi";

export const feedBackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeedBack: builder.mutation({
      query: (feedBackInfo) => ({
        url: "/feedbacks/create-feedback",
        method: "POST",
        body: feedBackInfo,
      }),
      invalidatesTags: ["feedback"],
    }),
    getMyFeedBacks: builder.query({
      query: () => ({
        url: "/feedbacks/get-all-feedbacks",
        method: "GET",
      }),
      providesTags: ["feedback"],
    }),
  }),
});
