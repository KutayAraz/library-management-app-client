import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book, User, UserDetails, BorrowBookArgs, ReturnBookArgs } from "./types";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Book", "User"],
  endpoints: (builder) => ({
    // Books endpoints
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
      providesTags: ["Book"],
    }),

    // This is the frequently accessed endpoint - will be cached
    getBookById: builder.query<Book, number>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),

    // Users endpoints
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    getUserById: builder.query<UserDetails, number>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    // Mutation endpoints
    borrowBook: builder.mutation<void, BorrowBookArgs>({
      query: ({ userId, bookId }) => ({
        url: `/users/${userId}/borrow/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { bookId }) => [{ type: "Book", id: bookId }, "User"],
    }),

    returnBook: builder.mutation<void, ReturnBookArgs>({
      query: ({ userId, bookId, score }) => ({
        url: `/users/${userId}/return/${bookId}`,
        method: "POST",
        body: { score },
      }),
      invalidatesTags: (_result, _error, { bookId }) => [{ type: "Book", id: bookId }, "User"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useBorrowBookMutation,
  useReturnBookMutation,
} = libraryApi;
