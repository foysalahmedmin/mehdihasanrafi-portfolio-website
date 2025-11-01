import api from "@/lib/api";
import type {
  TBulkPublicationResponse,
  TPublication,
  TPublicationResponse,
} from "@/types/publication.type";
import type { Response } from "@/types/response.type";

export type CreatePublicationPayload = {
  title: string;
  slug: string;
  link?: string;
  description?: string;
  abstract: string;
  content: string;
  venue: string;
  publisher?: string;
  journal?: string;
  volume?: string;
  code?: string;
  doi?: string | null;
  category?: string;
  author?: string;
  authors?: string[];
  thumbnail?: File;
  pdf?: File;
  images?: File[];
  tags?: string[];
  status?: "draft" | "pending" | "published" | "archived";
  is_featured?: boolean;
  published_at?: string;
  read_time?: string;
};

export type UpdatePublicationPayload = Partial<CreatePublicationPayload> & {
  thumbnail?: File | null;
  pdf?: File | null;
  images?: File[];
};

// GET - Get all publications
export async function getAllPublications(): Promise<TBulkPublicationResponse> {
  const response = await api.get("/api/publications");
  return response.data as TBulkPublicationResponse;
}

// GET - Get single publication by slug
export async function getPublicationBySlug(
  slug: string,
): Promise<TPublicationResponse> {
  const response = await api.get(`/api/publications/${slug}`);
  return response.data as TPublicationResponse;
}

// POST - Create publication
export async function createPublication(
  payload: CreatePublicationPayload,
): Promise<TPublicationResponse> {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("slug", payload.slug);
  formData.append("abstract", payload.abstract);
  formData.append("content", payload.content);
  formData.append("venue", payload.venue);

  if (payload.link) formData.append("link", payload.link);
  if (payload.description) formData.append("description", payload.description);
  if (payload.publisher) formData.append("publisher", payload.publisher);
  if (payload.journal) formData.append("journal", payload.journal);
  if (payload.volume) formData.append("volume", payload.volume);
  if (payload.code) formData.append("code", payload.code);
  if (payload.doi !== undefined) {
    formData.append("doi", payload.doi || "");
  }
  if (payload.category) formData.append("category", payload.category);
  if (payload.author) formData.append("author", payload.author);
  if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail);
  if (payload.pdf) formData.append("pdf", payload.pdf);
  if (payload.read_time) formData.append("read_time", payload.read_time);
  if (payload.published_at)
    formData.append("published_at", payload.published_at);

  if (payload.status) formData.append("status", payload.status);
  if (payload.is_featured !== undefined) {
    formData.append("is_featured", String(payload.is_featured));
  }

  if (payload.tags?.length) {
    payload.tags.forEach((tag) => formData.append("tags", tag));
  }

  if (payload.authors?.length) {
    payload.authors.forEach((author) => formData.append("authors", author));
  }

  if (payload.images?.length) {
    payload.images.forEach((image) => formData.append("images", image));
  }

  const response = await api.post("/api/publications", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TPublicationResponse;
}

// PATCH - Update publication
export async function updatePublication(
  id: string,
  payload: UpdatePublicationPayload,
): Promise<TPublicationResponse> {
  const formData = new FormData();

  if (payload.title) formData.append("title", payload.title);
  if (payload.slug) formData.append("slug", payload.slug);
  if (payload.abstract) formData.append("abstract", payload.abstract);
  if (payload.content) formData.append("content", payload.content);
  if (payload.venue) formData.append("venue", payload.venue);
  if (payload.publisher) formData.append("publisher", payload.publisher);
  if (payload.journal) formData.append("journal", payload.journal);
  if (payload.volume) formData.append("volume", payload.volume);
  if (payload.code) formData.append("code", payload.code);
  if (payload.doi !== undefined) {
    formData.append("doi", payload.doi || "");
  }
  if (payload.category) formData.append("category", payload.category);
  if (payload.author) formData.append("author", payload.author);
  if (payload.read_time) formData.append("read_time", payload.read_time);
  if (payload.published_at)
    formData.append("published_at", payload.published_at);

  if (payload.thumbnail !== undefined) {
    if (payload.thumbnail instanceof File) {
      formData.append("thumbnail", payload.thumbnail);
    } else if (payload.thumbnail === null) {
      formData.append("thumbnail", "");
    }
  }

  if (payload.pdf !== undefined) {
    if (payload.pdf instanceof File) {
      formData.append("pdf", payload.pdf);
    } else if (payload.pdf === null) {
      formData.append("pdf", "");
    }
  }

  if (payload.status) formData.append("status", payload.status);
  if (payload.is_featured !== undefined) {
    formData.append("is_featured", String(payload.is_featured));
  }

  if (payload.tags) {
    payload.tags.forEach((tag) => formData.append("tags", tag));
  }

  if (payload.authors) {
    payload.authors.forEach((author) => formData.append("authors", author));
  }

  if (payload.images) {
    payload.images.forEach((image) => formData.append("images", image));
  }

  const response = await api.patch(`/api/publications/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TPublicationResponse;
}

// DELETE - Delete publication permanently
export async function deletePublication(id: string): Promise<Response<null>> {
  const response = await api.delete(`/api/publications/${id}/permanent`);
  return response.data as Response<null>;
}

