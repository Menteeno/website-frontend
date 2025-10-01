import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { components } from "../api/openapi.types";
import { getAppConfig } from "../lib/config";

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
    baseUrl: getAppConfig().apiUrl,
    prepareHeaders: (headers) => {
      // Add authorization header if token exists
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
    fetchFn: async (...args) => {
      console.log("RTK Query fetch:", args[0]);
      const response = await fetch(...args);
      console.log("RTK Query response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });
      return response;
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
    v1_auth_user_show: builder.mutation<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/auth/user", arg?.path);
        return {
          url,
          method: "POST",
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    v1_auth_user_update: builder.mutation<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
        body?: components["schemas"]["UpdateUserRequest"];
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/auth/user", arg?.path);
        return {
          url,
          method: "PUT",
          body: arg?.body,
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
    publicSurvey_showBySlug: builder.query<
      components["schemas"]["SurveyResource"],
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/survey-by/{slug}", arg?.path);
        return {
          url,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    question_index: builder.query<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/questions", arg?.path);
        return {
          url,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    question_storeCustom: builder.mutation<
      components["schemas"]["SurveyQuestionResource"],
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
        body?: components["schemas"]["StoreCustomQuestionRequest"];
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/questions/custom", arg?.path);
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
    response_submit: builder.mutation<
      components["schemas"]["SurveyResponseResource"],
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
        body?: components["schemas"]["SubmitSurveyResponseRequest"];
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/surveys/{survey}/responses", arg?.path);
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
    stats_creator: builder.query<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/surveys/{survey}/stats/creator", arg?.path);
        return {
          url,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    stats_admin: builder.query<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/surveys/{survey}/stats/admin", arg?.path);
        return {
          url,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    survey_index: builder.query<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/surveys", arg?.path);
        return {
          url,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    survey_store: builder.mutation<
      components["schemas"]["SurveyResource"],
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
        body?: components["schemas"]["StoreSurveyRequest"];
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/surveys", arg?.path);
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
    survey_show: builder.query<
      components["schemas"]["SurveyResource"],
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/surveys/{survey}", arg?.path);
        return {
          url,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    survey_update: builder.mutation<
      components["schemas"]["SurveyResource"],
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
        body?: components["schemas"]["UpdateSurveyRequest"];
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/surveys/{survey}", arg?.path);
        return {
          url,
          method: "PUT",
          body: arg?.body,
          ...(arg?.query && Object.keys(arg.query).length > 0
            ? { params: arg.query }
            : {}),
        };
      },
    }),
    survey_destroy: builder.mutation<
      any,
      {
        path?: Record<string, any>;
        query?: Record<string, any>;
      }
    >({
      query: (arg) => {
        const url = fillPath("/v1/surveys/{survey}", arg?.path);
        return {
          url,
          method: "DELETE",
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
export const useV1_auth_user_showMutation =
  menteenoApi.useV1_auth_user_showMutation;
export const useV1_auth_user_updateMutation =
  menteenoApi.useV1_auth_user_updateMutation;
export const useBroadcast_authenticateQuery =
  menteenoApi.useBroadcast_authenticateQuery;
export const usePublicSurvey_showBySlugQuery =
  menteenoApi.usePublicSurvey_showBySlugQuery;
export const useQuestion_indexQuery = menteenoApi.useQuestion_indexQuery;
export const useQuestion_storeCustomMutation =
  menteenoApi.useQuestion_storeCustomMutation;
export const useResponse_submitMutation =
  menteenoApi.useResponse_submitMutation;
export const useStats_creatorQuery = menteenoApi.useStats_creatorQuery;
export const useStats_adminQuery = menteenoApi.useStats_adminQuery;
export const useSurvey_indexQuery = menteenoApi.useSurvey_indexQuery;
export const useSurvey_storeMutation = menteenoApi.useSurvey_storeMutation;
export const useSurvey_showQuery = menteenoApi.useSurvey_showQuery;
export const useSurvey_updateMutation = menteenoApi.useSurvey_updateMutation;
export const useSurvey_destroyMutation = menteenoApi.useSurvey_destroyMutation;

// Export the API for use in store configuration
export default menteenoApi;
