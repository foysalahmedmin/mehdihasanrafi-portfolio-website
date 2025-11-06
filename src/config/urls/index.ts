import { ENV } from "../env";

export const URLS = {
  app: ENV.app_url,
  api: ENV.api_url,
  user: `${ENV.api_url}/uploads/users`,
  news: {
    thumbnail: `${ENV.api_url}/uploads/news/images`,
    image: `${ENV.api_url}/uploads/news/images`,
    video: `${ENV.api_url}/uploads/news/videos`,
  },
  projects: {
    thumbnail: `${ENV.api_url}/uploads/projects/images`,
    image: `${ENV.api_url}/uploads/projects/images`,
  },
  publications: {
    thumbnail: `${ENV.api_url}/uploads/publications/images`,
    image: `${ENV.api_url}/uploads/publications/images`,
    pdf: `${ENV.api_url}/uploads/publications/pdfs`,
  },
  gallery: {
    image: `${ENV.api_url}/uploads/gallery/images`,
    video: `${ENV.api_url}/uploads/gallery/videos`,
  },
};
