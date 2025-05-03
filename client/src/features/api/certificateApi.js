import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CERTIFICATE_API = "http://localhost:8080/api/v1/certificate";

export const certificateApi = createApi({
  reducerPath: "certificateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CERTIFICATE_API,
    credentials: "include", // 🔒 keep if you need to send cookies
  }),
  endpoints: (builder) => ({
    // Mutation for generating a certificate
    generateCertificate: builder.mutation({
      query: (data) => ({
        url: "/generate",
        method: "POST",
        body: data,
      }),
    }),
    // Query for getting user certificates
    getUserCertificates: builder.query({
      // query: (userName) => `/certificates/${userName}`,
      query: (userId) => `/certificates/${userId}`,
    }),
  }),
});

export const { useGenerateCertificateMutation, useGetUserCertificatesQuery } = certificateApi;
