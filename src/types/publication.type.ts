import type { Response } from "./response.type";

export type TStatus = "draft" | "pending" | "published" | "archived";

export type TPublication = {
  id: string;
  title: string;
  slug: string;
  authors: string[];
  venue: string;
  date: string;
  abstract: string;
  content: string;
  doi: string | null;
  pdfUrl: string | null;
  externalUrl: string | null;
  _id: string;
  // category: {
  //   _id: string;
  //   name: string;
  // };
  author: {
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

export type TCreatePublicationPayload = {
};

export type TUpdatePublicationPayload = {
};

export type TPublicationResponse = Response<TPublication>;
export type TBulkPublicationResponse = Response<TPublication[]>;
