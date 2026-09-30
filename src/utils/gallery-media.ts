import { URLS } from "@/config/urls";
import type { TGallery } from "@/types/gallery.type";

/**
 * Resolves the actual, loadable URL for a gallery item's media: an external
 * URL is used as-is, an uploaded file's stored relative path (e.g.
 * "2025/10/photo-123.jpg") is prefixed with the right uploads host. Returns
 * "" if the item somehow has neither (shouldn't happen — the backend
 * requires one or the other for every item).
 */
export function getGalleryMediaUrl(item: TGallery): string {
  if (item.media_type === "image") {
    if (item.image_url) return item.image_url;
    if (item.image) {
      return item.image.startsWith("http")
        ? item.image
        : `${URLS.gallery.image}/${item.image}`;
    }
  } else {
    if (item.video_url) return item.video_url;
    if (item.video) {
      return item.video.startsWith("http")
        ? item.video
        : `${URLS.gallery.video}/${item.video}`;
    }
  }
  return "";
}
