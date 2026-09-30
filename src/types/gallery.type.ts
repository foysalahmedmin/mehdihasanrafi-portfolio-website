import type { Response } from "./response.type";

export type TMediaType = "image" | "video";

export type TGallery = {
  _id: string;
  caption?: string;
  media_type: TMediaType;
  image_url?: string | null;
  image?: string | null;
  video_url?: string | null;
  video?: string | null;
  order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

// Batch create: any number of files (mixed images/videos in one request),
// plus optionally one external image URL and/or one video URL — each URL
// becomes its own additional item. Shared caption/is_active apply to every
// item created in the batch.
export type TCreateGalleryPayload = {
  caption?: string;
  is_active?: boolean;
  files?: File[];
  image_url?: string;
  video_url?: string;
};

// Update a single existing item. A field is only ever changed on the server
// if it's actually present here — see services/gallery.service.ts.
export type TUpdateGalleryPayload = {
  caption?: string;
  order?: number;
  is_active?: boolean;
  file?: File; // replacement file — must match the item's existing media_type
  image_url?: string; // only applied if this item's media_type is "image"
  video_url?: string; // only applied if this item's media_type is "video"
};

export type TGalleryResponse = Response<TGallery>;
export type TBulkGalleryResponse = Response<TGallery[]>;
