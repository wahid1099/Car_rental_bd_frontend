import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/auth/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/auth/user-update",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});
