import type { Response } from "./response.type";

export type TNewsStatus = "draft" | "pending" | "published" | "archived";

export type TNews = {
  _id: string;
  title: string;
  slug: string;
  link?: string;
  description?: string;
  content: string;
  thumbnail?: string;
  read_time?: string;
  category: string;
  author?: string;
  images?: string[];
  video?: string;
  youtube?: string;
  tags?: string[];
  status?: TNewsStatus;
  is_featured?: boolean;
  published_at?: Date | string;
  created_at?: string;
  updated_at?: string;
};

// export type TCreateNewsPayload = {
// };

// export type TUpdateNewsPayload = {
// };

export type TNewsResponse = Response<TNews>;
export type TBulkNewsResponse = Response<TNews[]>;
