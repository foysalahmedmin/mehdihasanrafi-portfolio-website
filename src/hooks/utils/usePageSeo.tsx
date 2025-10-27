import { useEffect } from "react";

interface PageSEO {
  title: string;
  description: string;
}

export function usePageSEO({ title, description }: PageSEO) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Mehedi Hasan Rafi`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update OG tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", `${title} | Mehedi Hasan Rafi`);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute("content", description);

    // Cleanup on unmount
    return () => {
      document.title = "Mehedi Hasan Rafi - PhD Researcher in Atmospheric Studies";
    };
  }, [title, description]);
}
