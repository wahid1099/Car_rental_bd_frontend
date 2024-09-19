import { baseApi } from "../../api/baseApi";

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (carData) => {
        console.log("carData", carData);
        return {
          url: "/cars",
          method: "POST",
          body: carData,
        };
      },
      invalidatesTags: ["car"],
    }),
    getAllCars: builder.query({
      query: ({ name, carType, price, location }) => {
        const params = new URLSearchParams();
        if (name) {
          params.append("name", name);
        }
        if (carType) {
          params.append("carType", carType);
        }
        if (price > 0) {
          params.append("price", price);
        }
        if (location) {
          params.append("location", location);
        }

        return {
          url: "/cars",
          method: "GET",
          params,
        };
      },
      providesTags: ["car"],
    }),
    getSingleCars: builder.query({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["car"],
    }),
    searchCarsForBooking: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args?.carType) {
          params.append("carType", args.carType);
        }
        if (args?.features) {
          params.append("features", args.features);
        }
        if (args?.seats) {
          params.append("seats", args.seats);
        }

        return {
          url: "/cars/search-cars",
          method: "GET",
          params,
        };
      },
      providesTags: ["car"],
    }),
    updateCar: builder.mutation({
      query: ({ id, carData }) => {
        console.log(id, carData);
        return {
          url: `/cars/${id}`,
          method: "PUT",
          body: carData,
        };
      },
      invalidatesTags: ["car"],
    }),
    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["car"],
    }),
    returnCar: builder.mutation({
      query: (bookingId) => ({
        url: `/cars/return-car/${bookingId}`,
        method: "PUT",
      }),
      invalidatesTags: ["car"],
    }),
  }),
});
