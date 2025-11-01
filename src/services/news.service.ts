import api from "@/lib/api";
import type {
  TBulkNewsResponse,
  TNews,
  TNewsResponse,
} from "@/types/news.type";
import type { Response } from "@/types/response.type";

export type CreateNewsPayload = {
  title: string;
  slug: string;
  link?: string;
  description?: string;
  content: string;
  category: string;
  author?: string;
  thumbnail?: File;
  images?: File[];
  video?: string;
  youtube?: string;
  tags?: string[];
  status?: "draft" | "pending" | "published" | "archived";
  is_featured?: boolean;
  published_at?: string;
  read_time?: string;
};

export type UpdateNewsPayload = Partial<CreateNewsPayload> & {
  thumbnail?: File | null;
  images?: File[];
};

// GET - Get all news
export async function getAllNews(): Promise<TBulkNewsResponse> {
  const response = await api.get("/api/news");
  return response.data as TBulkNewsResponse;
}

// GET - Get single news by slug
export async function getNewsBySlug(slug: string): Promise<TNewsResponse> {
  const response = await api.get(`/api/news/${slug}`);
  return response.data as TNewsResponse;
}

// POST - Create news
export async function createNews(
  payload: CreateNewsPayload,
): Promise<TNewsResponse> {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("slug", payload.slug);
  formData.append("content", payload.content);
  formData.append("category", payload.category);
  
  if (payload.link) formData.append("link", payload.link);
  if (payload.description) formData.append("description", payload.description);
  if (payload.author) formData.append("author", payload.author);
  if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail);
  if (payload.video) formData.append("video", payload.video);
  if (payload.youtube) formData.append("youtube", payload.youtube);
  if (payload.read_time) formData.append("read_time", payload.read_time);
  if (payload.published_at) formData.append("published_at", payload.published_at);
  
  if (payload.status) formData.append("status", payload.status);
  if (payload.is_featured !== undefined) {
    formData.append("is_featured", String(payload.is_featured));
  }
  
  if (payload.tags?.length) {
    payload.tags.forEach((tag) => formData.append("tags", tag));
  }
  
  if (payload.images?.length) {
    payload.images.forEach((image) => formData.append("images", image));
  }

  const response = await api.post("/api/news", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TNewsResponse;
}

// PATCH - Update news
export async function updateNews(
  id: string,
  payload: UpdateNewsPayload,
): Promise<TNewsResponse> {
  const formData = new FormData();
  
  if (payload.title) formData.append("title", payload.title);
  if (payload.slug) formData.append("slug", payload.slug);
  if (payload.content) formData.append("content", payload.content);
  if (payload.category) formData.append("category", payload.category);
  if (payload.link) formData.append("link", payload.link);
  if (payload.description) formData.append("description", payload.description);
  if (payload.author) formData.append("author", payload.author);
  if (payload.video) formData.append("video", payload.video);
  if (payload.youtube) formData.append("youtube", payload.youtube);
  if (payload.read_time) formData.append("read_time", payload.read_time);
  if (payload.published_at) formData.append("published_at", payload.published_at);
  
  if (payload.thumbnail !== undefined) {
    if (payload.thumbnail instanceof File) {
      formData.append("thumbnail", payload.thumbnail);
    } else if (payload.thumbnail === null) {
      formData.append("thumbnail", "");
    }
  }
  
  if (payload.status) formData.append("status", payload.status);
  if (payload.is_featured !== undefined) {
    formData.append("is_featured", String(payload.is_featured));
  }
  
  if (payload.tags) {
    payload.tags.forEach((tag) => formData.append("tags", tag));
  }
  
  if (payload.images) {
    payload.images.forEach((image) => formData.append("images", image));
  }

  const response = await api.patch(`/api/news/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TNewsResponse;
}

// DELETE - Delete news permanently
export async function deleteNews(id: string): Promise<Response<null>> {
  const response = await api.delete(`/api/news/${id}/permanent`);
  return response.data as Response<null>;
}

