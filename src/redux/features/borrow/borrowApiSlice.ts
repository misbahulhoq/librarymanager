import { baseApi } from "@/redux/api";

const borrowApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBorrows: builder.query({
      query: () => ({ url: "/borrows" }),
      providesTags: ["Borrow"],
    }),
    borrowBook: builder.mutation({
      query: (data) => ({
        url: "/borrows",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),
  }),
});

export const { useGetBorrowsQuery, useBorrowBookMutation } = borrowApiSlice;
