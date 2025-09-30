import { API_BASE_URL, API_TIMEOUT } from "@/lib/constants";
import { handleApiError, retryWithBackoff } from "@/lib/error-handler";
import type { PaginatedResponse } from "@/types/common";

interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(
    baseURL: string = API_BASE_URL,
    defaultTimeout: number = API_TIMEOUT
  ) {
    this.baseURL = baseURL;
    this.defaultTimeout = defaultTimeout;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retries = 3,
      ...fetchOptions
    } = options;

    const url = `${this.baseURL}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw handleApiError({
          response: { data: errorData },
          status: response.status,
        });
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw handleApiError(error);
    }
  }

  async get<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
    return retryWithBackoff(
      () => this.request<T>(endpoint, { ...options, method: "GET" }),
      options?.retries
    );
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return retryWithBackoff(() => {
      const requestOptions: RequestOptions = {
        ...options,
        method: "POST",
      };
      if (data) {
        requestOptions.body = JSON.stringify(data);
      }
      return this.request<T>(endpoint, requestOptions);
    }, options?.retries);
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return retryWithBackoff(() => {
      const requestOptions: RequestOptions = {
        ...options,
        method: "PUT",
      };
      if (data) {
        requestOptions.body = JSON.stringify(data);
      }
      return this.request<T>(endpoint, requestOptions);
    }, options?.retries);
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return retryWithBackoff(() => {
      const requestOptions: RequestOptions = {
        ...options,
        method: "PATCH",
      };
      if (data) {
        requestOptions.body = JSON.stringify(data);
      }
      return this.request<T>(endpoint, requestOptions);
    }, options?.retries);
  }

  async delete<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return retryWithBackoff(
      () => this.request<T>(endpoint, { ...options, method: "DELETE" }),
      options?.retries
    );
  }

  // Convenience methods for common operations
  async getPaginated<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    options?: RequestOptions
  ): Promise<PaginatedResponse<T>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const queryString = searchParams.toString();
    const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.get<PaginatedResponse<T>>(fullEndpoint, options);
  }

  async uploadFile<T = any>(
    endpoint: string,
    file: File,
    options?: RequestOptions
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    return retryWithBackoff(
      () =>
        this.request<T>(endpoint, {
          ...options,
          method: "POST",
          body: formData,
          headers: {
            // Don't set Content-Type for FormData, let the browser set it
            ...options?.headers,
          },
        }),
      options?.retries
    );
  }
}

// Create a default instance
export const apiClient = new ApiClient();

// Export the class for custom instances
export { ApiClient };
