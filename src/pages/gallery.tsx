import { Card, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { URLS } from "@/config/urls";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import type { TBulkGalleryResponse } from "@/types/gallery.type";
import { useQuery } from "@tanstack/react-query";
import { Image as ImageIcon, Play } from "lucide-react";
import { useState } from "react";

export default function Gallery() {
  usePageSEO({
    title: "Gallery",
    description:
      "Explore the gallery showcasing images and videos from Mehedi Hasan Rafi's research work, presentations, and academic activities.",
  });

  const { data: galleryResponse, isLoading } = useQuery<TBulkGalleryResponse>({
    queryKey: ["/api/gallery/public"],
  });

  const gallery = galleryResponse?.data || [];
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    type: "image" | "video";
    caption?: string;
  } | null>(null);

  const getMediaUrl = (item: (typeof gallery)[0]) => {
    if (item.media_type === "image") {
      if (item.image_url) return item.image_url;
      if (item.image) {
        return item.image.startsWith("http")
          ? item.image
          : `${URLS.gallery.image}/${item.image}`;
      }
    } else {
      if (item.video_url) return item.video_url;
      if (item.video) {
        return item.video.startsWith("http")
          ? item.video
          : `${URLS.gallery.video}/${item.video}`;
      }
    }
    return "";
  };

  const handleMediaClick = (item: (typeof gallery)[0]) => {
    const url = getMediaUrl(item);
    if (url) {
      setSelectedMedia({
        url,
        type: item.media_type,
        caption: item.caption,
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header Section */}
      <section className="bg-accent/20 border-b py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="fade-up max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Gallery</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore images and videos from my research work, conference
              presentations, field studies, and academic activities.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="flex-1 py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                </Card>
              ))}
            </div>
          ) : gallery.length > 0 ? (
            <div className="fade-up grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {gallery.map((item) => {
                const mediaUrl = getMediaUrl(item);
                if (!mediaUrl) return null;

                return (
                  <Card
                    key={item._id}
                    className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
                    onClick={() => handleMediaClick(item)}
                  >
                    <div className="relative aspect-square">
                      {item.media_type === "image" ? (
                        <img
                          src={mediaUrl}
                          alt={item.caption || "Gallery image"}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="relative h-full w-full bg-black">
                          <video
                            src={mediaUrl}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
                            <Play
                              className="h-12 w-12 text-white"
                              fill="white"
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                        {item.media_type === "image" ? (
                          <ImageIcon className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                        ) : (
                          <Play
                            className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            fill="white"
                          />
                        )}
                      </div>
                    </div>
                    {item.caption && (
                      <div className="p-3">
                        <p className="text-muted-foreground line-clamp-2 text-sm">
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-16 text-center">
              <CardDescription className="text-lg">
                No gallery items available yet.
              </CardDescription>
            </Card>
          )}
        </div>
      </section>

      {/* Media Viewer Dialog */}
      <Dialog
        open={!!selectedMedia}
        onOpenChange={(open) => !open && setSelectedMedia(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-4xl">
          <DialogHeader>
            <DialogTitle>Gallery</DialogTitle>
            {selectedMedia?.caption && (
              <DialogDescription>{selectedMedia.caption}</DialogDescription>
            )}
          </DialogHeader>
          <div className="w-full">
            {selectedMedia?.type === "image" ? (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.caption || "Gallery image"}
                className="h-auto max-h-[70vh] w-full rounded object-contain"
              />
            ) : (
              <video
                src={selectedMedia?.url}
                controls
                className="h-auto max-h-[70vh] w-full rounded"
                autoPlay
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
