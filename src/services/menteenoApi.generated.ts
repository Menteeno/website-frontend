import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { components } from "../api/openapi.types";

// Helper function to fill path templates with parameters
function fillPath(template: string, params?: Record<string, any>): string {
  if (!params) return template;

  return template.replace(/\{([^}]+)\}/g, (match, paramName) => {
    const value = params[paramName];
    if (value === undefined || value === null) {
      throw new Error(`Missing required path parameter: ${paramName}`);
    }
    return String(value);
  });
}

// Base API configuration
export const menteenoApi = createApi({
  reducerPath: "menteenoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://menteeno-backend.chbk.app/api",
    prepareHeaders: (headers, api) => {
      // Add authorization header if token exists
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    v1_auth_send_code: builder.mutation<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
        body?: components["schemas"]["SendCodeRequest"];
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/auth/send-code", arg?.path);
        return {
          url,
          method: "POST",
          body: arg?.body,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    v1_auth_verify_code: builder.mutation<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
        body?: components["schemas"]["VerifyCodeRequest"];
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/auth/verify-code", arg?.path);
        return {
          url,
          method: "POST",
          body: arg?.body,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    v1_auth_logout: builder.mutation<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/auth/logout", arg?.path);
        return {
          url,
          method: "POST",
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    v1_auth_refresh: builder.mutation<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/auth/refresh", arg?.path);
        return {
          url,
          method: "POST",
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    broadcast_authenticate: builder.query<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/broadcasting/auth", arg?.path);
        return {
          url,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
  }),
});

// Export hooks
export const useV1_auth_send_codeMutation =
  menteenoApi.useV1_auth_send_codeMutation;
export const useV1_auth_verify_codeMutation =
  menteenoApi.useV1_auth_verify_codeMutation;
export const useV1_auth_logoutMutation = menteenoApi.useV1_auth_logoutMutation;
export const useV1_auth_refreshMutation =
  menteenoApi.useV1_auth_refreshMutation;
export const useBroadcast_authenticateQuery =
  menteenoApi.useBroadcast_authenticateQuery;

// Export the API for use in store configuration
export default menteenoApi;
