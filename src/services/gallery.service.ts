import api from "@/lib/api";
import type {
  TBulkGalleryResponse,
  TCreateGalleryPayload,
  TGalleryResponse,
  TUpdateGalleryPayload,
} from "@/types/gallery.type";
import type { Response } from "@/types/response.type";

// GET - all gallery items (admin management view — every item, any status)
export async function getAllGallery(): Promise<TBulkGalleryResponse> {
  const response = await api.get("/api/gallery");
  return response.data as TBulkGalleryResponse;
}

// GET - public gallery items (active only, admin-ordered)
export async function getPublicGallery(): Promise<TBulkGalleryResponse> {
  const response = await api.get("/api/gallery/public");
  return response.data as TBulkGalleryResponse;
}

// POST - create one or more gallery items in a single batch
export async function createGallery(
  payload: TCreateGalleryPayload,
): Promise<TBulkGalleryResponse> {
  const formData = new FormData();

  if (payload.caption) formData.append("caption", payload.caption);
  if (payload.is_active !== undefined) {
    formData.append("is_active", String(payload.is_active));
  }
  if (payload.image_url) formData.append("image_url", payload.image_url);
  if (payload.video_url) formData.append("video_url", payload.video_url);
  payload.files?.forEach((file) => formData.append("files", file));

  const response = await api.post("/api/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TBulkGalleryResponse;
}

// PATCH - update a single gallery item. Only fields actually present on
// `payload` are sent, so leaving image_url/video_url/file untouched never
// risks clearing the item's existing media.
export async function updateGallery(
  id: string,
  payload: TUpdateGalleryPayload,
): Promise<TGalleryResponse> {
  const formData = new FormData();

  if (payload.caption !== undefined) formData.append("caption", payload.caption);
  if (payload.is_active !== undefined) {
    formData.append("is_active", String(payload.is_active));
  }
  if (payload.order !== undefined) formData.append("order", String(payload.order));
  if (payload.file) formData.append("files", payload.file);
  if (payload.image_url) formData.append("image_url", payload.image_url);
  if (payload.video_url) formData.append("video_url", payload.video_url);

  const response = await api.patch(`/api/gallery/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data as TGalleryResponse;
}

// DELETE - delete a gallery item permanently
export async function deleteGallery(id: string): Promise<Response<null>> {
  const response = await api.delete(`/api/gallery/${id}`);
  return response.data as Response<null>;
}
