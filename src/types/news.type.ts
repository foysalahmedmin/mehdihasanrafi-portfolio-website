import type { Response } from "./response.type";

export type TStatus = "draft" | "pending" | "published" | "archived";

export type TNews = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
  readTime: string;
  _id: string;
  // category: {
  //   _id: string;
  //   name: string;
  // };
  author?: {
    _id: string;
    name: string;
  };
  description?: string;
  thumbnail?: string;
  images?: string[];
  tags?: string[];
  status?: TStatus;
  is_featured: boolean;
  published_at?: Date;
  created_at?: string;
  updated_at?: string;
};

export type TCreateNewsPayload = {
};

export type TUpdateNewsPayload = {
};

export type TNewsResponse = Response<TNews>;
export type TBulkNewsResponse = Response<TNews[]>;
