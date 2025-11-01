import type { Response } from "./response.type";

export type TContact = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  updated_at?: string;
};

export type TCreateContact = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type TContactResponse = Response<TContact>;
