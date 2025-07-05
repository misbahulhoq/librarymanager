import { baseApi } from "@/redux/api";

const booksApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    getBooks: builder.query({
      query: () => ({ url: "/books" }),
      providesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: (data) => {
        console.log(data.info);
        return {
          url: `/books/${data._id}`,
          method: "PUT",
          body: data.info,
        };
      },
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApiSlice;
