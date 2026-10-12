import type { TGallery } from "@/types/gallery.type";

/**
 * Resolves the loadable URL for a gallery item's media. Every stored value
 * is already a full URL — either an externally pasted link, or the
 * Cloudinary secure_url the backend stored on upload — so no host
 * prefixing is needed. Returns "" if the item somehow has neither
 * (shouldn't happen — the backend requires one or the other for every
 * item).
 */
export function getGalleryMediaUrl(item: TGallery): string {
  if (item.media_type === "image") {
    return item.image_url || item.image || "";
  }
  return item.video_url || item.video || "";
}
