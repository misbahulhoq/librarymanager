import { baseApi } from "@/redux/api";

const booksApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({ url: "/books" }),
    }),
  }),
});

export const { useGetBooksQuery } = booksApiSlice;
