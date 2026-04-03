import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants/config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    // By providing this, Next.js / fetch will include cookies with the request!
    prepareHeaders: (headers) => {
      return headers;
    },
    fetchFn: (input, init) => {
      const initWtihCredentials = {
        ...init,
        credentials: "include" as RequestCredentials,
      };
      return fetch(input, initWtihCredentials);
    },
  }),
  tagTypes: ["User", "Documents"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    googleLogin: builder.mutation({
      query: (token) => ({
        url: "/auth/google",
        method: "POST",
        body: { token },
      }),
      invalidatesTags: ["User"],
    }),

    // Document Endpoints
    getDocuments: builder.query({
      query: () => "/documents/get",
      providesTags: ["Documents"],
    }),
    getDocumentsByUserId: builder.query({
      query: (userId) => `/documents/get/user/${userId}`,
      providesTags: ["Documents"],
    }),
    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/documents/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Documents"],
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/documents/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Documents"],
    }),
    editDocument: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/documents/edit/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Documents"],
    }),
    getMe: builder.query({
      query: () => "/auth/me",
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutUserMutation, 
  useGoogleLoginMutation,
  useGetDocumentsQuery,
  useGetDocumentsByUserIdQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useEditDocumentMutation,
  useGetMeQuery
} = apiSlice;
