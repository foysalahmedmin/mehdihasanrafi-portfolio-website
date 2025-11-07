import type { Response } from "./response.type";

export type TMediaType = "image" | "video";

export type TGallery = {
  _id: string;
  caption?: string;
  media_type: TMediaType;
  image_url?: string;
  image?: string;
  video_url?: string;
  video?: string;
  order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TCreateGallery = {
  caption?: string;
  media_type: TMediaType;
  image_url?: string;
  image?: File | string | null;
  video_url?: string;
  video?: File | string | null;
  order?: number;
  is_active?: boolean;
};

export type TUpdateGallery = Partial<TCreateGallery>;

export type TGalleryResponse = Response<TGallery>;
export type TBulkGalleryResponse = Response<TGallery[]>;
