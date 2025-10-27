import type { Response } from "./response.type";

export type TStatus = "draft" | "pending" | "published" | "archived";

export type TProject = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  imageUrl: string;
  date: string;
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

export type TCreateProjectPayload = {
};

export type TUpdateProjectPayload = {
};

export type TProjectResponse = Response<TProject>;
export type TBulkProjectResponse = Response<TProject[]>;
