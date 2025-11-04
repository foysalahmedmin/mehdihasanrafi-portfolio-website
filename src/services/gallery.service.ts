import api from "@/lib/api";
import type {
  TBulkGalleryResponse,
  TCreateGallery,
  TGalleryResponse,
  TUpdateGallery,
} from "@/types/gallery.type";
import type { Response } from "@/types/response.type";

export type CreateGalleryPayload = TCreateGallery;
export type UpdateGalleryPayload = TUpdateGallery;

// GET - Get all gallery items (admin)
export async function getAllGallery(): Promise<TBulkGalleryResponse> {
  const response = await api.get("/api/gallery");
  return response.data as TBulkGalleryResponse;
}

// POST - Create gallery item
export async function createGallery(
  payload: CreateGalleryPayload,
): Promise<TGalleryResponse> {
  const formData = new FormData();

  formData.append("media_type", payload.media_type);

  if (payload.caption) formData.append("caption", payload.caption);
  if (payload.image_url) formData.append("image_url", payload.image_url);
  if (payload.video_url) formData.append("video_url", payload.video_url);
  if (payload.image) formData.append("image", payload.image);
  if (payload.video) formData.append("video", payload.video);
  if (payload.order !== undefined)
    formData.append("order", String(payload.order));
  if (payload.is_active !== undefined) {
    formData.append("is_active", String(payload.is_active));
  }

  const response = await api.post("/api/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TGalleryResponse;
}

// PATCH - Update gallery item
export async function updateGallery(
  id: string,
  payload: UpdateGalleryPayload,
): Promise<TGalleryResponse> {
  const formData = new FormData();

  if (payload.media_type) formData.append("media_type", payload.media_type);
  if (payload.caption !== undefined) {
    formData.append("caption", payload.caption || "");
  }
  if (payload.image_url !== undefined) {
    formData.append("image_url", payload.image_url || "");
  }
  if (payload.video_url !== undefined) {
    formData.append("video_url", payload.video_url || "");
  }
  if (payload.image) {
    formData.append("image", payload.image);
  }
  if (payload.video) {
    formData.append("video", payload.video);
  }
  if (payload.order !== undefined) {
    formData.append("order", String(payload.order));
  }
  if (payload.is_active !== undefined) {
    formData.append("is_active", String(payload.is_active));
  }

  const response = await api.patch(`/api/gallery/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TGalleryResponse;
}

// DELETE - Delete gallery item
export async function deleteGallery(id: string): Promise<Response<null>> {
  const response = await api.delete(`/api/gallery/${id}`);
  return response.data as Response<null>;
}
