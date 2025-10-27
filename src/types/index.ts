import { TNews } from "./news.type";
import { TProject } from "./project.type";
import { TPublication } from "./publication.type";

export type News = TNews
export type Publication = TPublication
export type Project = TProject
export type InsertContact = {
  name: string;
  email: string;
  subject: string;
  message: string;
};