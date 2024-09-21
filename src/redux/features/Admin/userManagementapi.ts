import { baseApi } from "../../api/baseApi";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/auth/all-user",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    makeAdmin: builder.mutation({
      query: (userId: string) => ({
        url: `/auth/update-role/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});
