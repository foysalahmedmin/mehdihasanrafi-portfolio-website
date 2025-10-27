import { QueryClient, QueryFunction } from "@tanstack/react-query";
import api from "./api";

export async function apiRequest<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: unknown,
): Promise<T> {
  const res = await api.request<T>({
    method,
    url,
    data,
  });

  return res.data;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn =
  <T>(options: { on401: UnauthorizedBehavior }): QueryFunction<T> =>
  async ({ queryKey }) => {
    const endpoint = queryKey.join("/") as string;

    try {
      const res = await api.get<T>(endpoint);
      return res.data;
    } catch (error: any) {
      if (
        options.on401 === "returnNull" &&
        error.response?.status === 401
      ) {
        return null as T;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
