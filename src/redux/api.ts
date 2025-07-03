import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//TODO
let baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://api-librarymanager.vercel.app/api";

baseUrl = "https://api-librarymanager.vercel.app/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: () => ({}),
});
