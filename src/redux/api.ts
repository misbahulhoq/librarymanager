import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

//TODO
const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: () => ({}),
});
