import type { Response } from "./response.type";

export type TPublicationStatus = "draft" | "pending" | "published" | "archived";

export type TPublication = {
  _id: string;
  title: string;
  slug: string;
  link?: string;
  thumbnail?: string;
  read_time?: string;
  venue: string;
  abstract: string;
  content: string;
  publisher?: string;
  journal?: string;
  volume?: string;
  code?: string;
  doi?: string | null;
  category?: string;
  author?: string;
  authors?: string[];
  description?: string;
  pdf?: string | null;
  images?: string[];
  tags?: string[];
  status?: TPublicationStatus;
  is_featured: boolean;
  published_at?: Date;
  created_at?: string;
  updated_at?: string;
};

// export type TCreatePublicationPayload = {};

// export type TUpdatePublicationPayload = {};

export type TPublicationResponse = Response<TPublication>;
export type TBulkPublicationResponse = Response<TPublication[]>;
