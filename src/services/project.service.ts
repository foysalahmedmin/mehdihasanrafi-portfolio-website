import api from "@/lib/api";
import type {
  TBulkProjectResponse,
  TProject,
  TProjectResponse,
} from "@/types/project.type";
import type { Response } from "@/types/response.type";

export type CreateProjectPayload = {
  title: string;
  slug: string;
  link?: string;
  description?: string;
  content: string;
  category: string;
  author?: string;
  thumbnail?: File;
  images?: File[];
  tags?: string[];
  status?: "draft" | "pending" | "published" | "archived";
  is_featured?: boolean;
  published_at?: string;
  read_time?: string;
};

export type UpdateProjectPayload = Partial<CreateProjectPayload> & {
  thumbnail?: File | null;
  images?: File[];
};

// GET - Get all projects
export async function getAllProjects(): Promise<TBulkProjectResponse> {
  const response = await api.get("/api/projects");
  return response.data as TBulkProjectResponse;
}

// GET - Get single project by slug
export async function getProjectBySlug(
  slug: string,
): Promise<TProjectResponse> {
  const response = await api.get(`/api/projects/${slug}`);
  return response.data as TProjectResponse;
}

// POST - Create project
export async function createProject(
  payload: CreateProjectPayload,
): Promise<TProjectResponse> {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("slug", payload.slug);
  formData.append("content", payload.content);
  formData.append("category", payload.category);

  if (payload.link) formData.append("link", payload.link);
  if (payload.description) formData.append("description", payload.description);
  if (payload.author) formData.append("author", payload.author);
  if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail);
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

  if (payload.images?.length) {
    payload.images.forEach((image) => formData.append("images", image));
  }

  const response = await api.post("/api/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TProjectResponse;
}

// PATCH - Update project
export async function updateProject(
  id: string,
  payload: UpdateProjectPayload,
): Promise<TProjectResponse> {
  const formData = new FormData();

  if (payload.title) formData.append("title", payload.title);
  if (payload.slug) formData.append("slug", payload.slug);
  if (payload.content) formData.append("content", payload.content);
  if (payload.category) formData.append("category", payload.category);
  if (payload.link) formData.append("link", payload.link);
  if (payload.description) formData.append("description", payload.description);
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

  const response = await api.patch(`/api/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TProjectResponse;
}

// DELETE - Delete project permanently
export async function deleteProject(id: string): Promise<Response<null>> {
  const response = await api.delete(`/api/projects/${id}/permanent`);
  return response.data as Response<null>;
}

