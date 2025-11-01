import type { Response } from "./response.type";

export type TProjectStatus = "draft" | "pending" | "published" | "archived";

export type TProject = {
  _id: string;
  title: string;
  slug: string;
  link?: string;
  content: string;
  thumbnail: string;
  read_time?: string;
  category: string;
  author?: string;
  description?: string;
  images?: string[];
  tags?: string[];
  status?: TProjectStatus;
  is_featured?: boolean;
  published_at?: Date | string;
  created_at?: string;
  updated_at?: string;
};

// export type TCreateProjectPayload = {};

// export type TUpdateProjectPayload = {};

export type TProjectResponse = Response<TProject>;
export type TBulkProjectResponse = Response<TProject[]>;
