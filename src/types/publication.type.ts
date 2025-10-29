import type { Response } from "./response.type";

export type TPublicationStatus = "draft" | "pending" | "published" | "archived";

export type TPublication = {
  _id: string;
  title: string;
  slug: string;
  venue: string;
  date: string;
  abstract: string;
  content: string;
  doi: string | null;
  pdfUrl: string | null;
  externalUrl: string | null;
  category?: {
    _id: string;
    name: string;
  };
  author?: {
    _id: string;
    name: string;
  };
  authors?: string[];
  description?: string;
  thumbnail?: string;
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
