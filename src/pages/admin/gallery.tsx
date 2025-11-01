import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Image as ImageIcon, Video } from "lucide-react";
import { useToast } from "@/hooks/utils/useToast";
import {
  getAllGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  type CreateGalleryPayload,
  type UpdateGalleryPayload,
} from "@/services/gallery.service";
import type { TGallery } from "@/types/gallery.type";
import AdminLayout from "./layout";
import { URLS } from "@/config/urls";

export default function AdminGalleryPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<TGallery | null>(null);
  const [formData, setFormData] = useState<Partial<CreateGalleryPayload>>({
    media_type: "image",
    caption: "",
    is_active: true,
    order: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: getAllGallery,
  });

  const createMutation = useMutation({
    mutationFn: createGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery/public"] });
      toast({
        title: "Success",
        description: "Gallery item created successfully",
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to create gallery item",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGalleryPayload }) =>
      updateGallery(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery/public"] });
      toast({
        title: "Success",
        description: "Gallery item updated successfully",
      });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to update gallery item",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery/public"] });
      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to delete gallery item",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      media_type: "image",
      caption: "",
      is_active: true,
      order: 0,
    });
    setImageFile(null);
    setVideoFile(null);
    setSelectedGallery(null);
  };

  const handleCreate = () => {
    if (!formData.media_type) {
      toast({
        title: "Validation Error",
        description: "Please select media type",
        variant: "destructive",
      });
      return;
    }

    if (formData.media_type === "image" && !formData.image_url && !imageFile) {
      toast({
        title: "Validation Error",
        description: "Please provide either image URL or upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (formData.media_type === "video" && !formData.video_url && !videoFile) {
      toast({
        title: "Validation Error",
        description: "Please provide either video URL or upload a video file",
        variant: "destructive",
      });
      return;
    }

    createMutation.mutate({
      ...formData,
      image: imageFile || undefined,
      video: videoFile || undefined,
    } as CreateGalleryPayload);
  };

  const handleEdit = (gallery: TGallery) => {
    setSelectedGallery(gallery);
    setFormData({
      media_type: gallery.media_type,
      caption: gallery.caption || "",
      image_url: gallery.image_url || "",
      video_url: gallery.video_url || "",
      is_active: gallery.is_active ?? true,
      order: gallery.order || 0,
    });
    setImageFile(null);
    setVideoFile(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedGallery) return;

    if (
      formData.media_type === "image" &&
      !formData.image_url &&
      !imageFile &&
      !selectedGallery.image
    ) {
      toast({
        title: "Validation Error",
        description: "Please provide either image URL or upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (
      formData.media_type === "video" &&
      !formData.video_url &&
      !videoFile &&
      !selectedGallery.video
    ) {
      toast({
        title: "Validation Error",
        description: "Please provide either video URL or upload a video file",
        variant: "destructive",
      });
      return;
    }

    updateMutation.mutate({
      id: selectedGallery._id,
      payload: {
        ...formData,
        image: imageFile || undefined,
        video: videoFile || undefined,
      },
    });
  };

  const handleDelete = (gallery: TGallery) => {
    setSelectedGallery(gallery);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedGallery) {
      deleteMutation.mutate(selectedGallery._id);
    }
  };

  const getMediaUrl = (item: TGallery) => {
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

  const gallery = data?.data || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gallery Management</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage gallery items
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Gallery Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Gallery Item</DialogTitle>
                <DialogDescription>
                  Add a new image or video to the gallery
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Media Type *</Label>
                  <Select
                    value={formData.media_type}
                    onValueChange={(value: "image" | "video") =>
                      setFormData({ ...formData, media_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.media_type === "image" ? (
                  <>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={formData.image_url || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, image_url: e.target.value })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Or upload an image file below
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Upload Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Video URL</Label>
                      <Input
                        placeholder="https://example.com/video.mp4"
                        value={formData.video_url || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, video_url: e.target.value })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Or upload a video file below
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Upload Video</Label>
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          setVideoFile(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label>Caption</Label>
                  <Input
                    placeholder="Optional caption for this item"
                    value={formData.caption || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, caption: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Order</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.order || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>

                <Button
                  onClick={handleCreate}
                  disabled={createMutation.isPending}
                  className="w-full"
                >
                  {createMutation.isPending ? "Creating..." : "Create Gallery Item"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Caption</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gallery.map((item) => {
                  const mediaUrl = getMediaUrl(item);
                  return (
                    <TableRow key={item._id}>
                      <TableCell>
                        {mediaUrl && (
                          <div className="w-20 h-20 relative rounded overflow-hidden">
                            {item.media_type === "image" ? (
                              <img
                                src={mediaUrl}
                                alt={item.caption || "Gallery item"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-black flex items-center justify-center">
                                <Video className="h-6 w-6 text-white" />
                              </div>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={item.media_type === "image" ? "default" : "secondary"}
                        >
                          {item.media_type === "image" ? (
                            <ImageIcon className="mr-1 h-3 w-3" />
                          ) : (
                            <Video className="mr-1 h-3 w-3" />
                          )}
                          {item.media_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {item.caption || "-"}
                      </TableCell>
                      <TableCell>{item.order || 0}</TableCell>
                      <TableCell>
                        <Badge variant={item.is_active ? "default" : "secondary"}>
                          {item.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Gallery Item</DialogTitle>
              <DialogDescription>Update gallery item details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Media Type *</Label>
                <Select
                  value={formData.media_type}
                  onValueChange={(value: "image" | "video") =>
                    setFormData({ ...formData, media_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.media_type === "image" ? (
                <>
                  {selectedGallery?.image && (
                    <div className="space-y-2">
                      <Label>Current Image</Label>
                      <img
                        src={getMediaUrl(selectedGallery)}
                        alt="Current"
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.image_url || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to keep current or upload new image below
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Upload New Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  {selectedGallery?.video && (
                    <div className="space-y-2">
                      <Label>Current Video</Label>
                      <div className="w-full h-48 bg-black rounded flex items-center justify-center">
                        <Video className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Video URL</Label>
                    <Input
                      placeholder="https://example.com/video.mp4"
                      value={formData.video_url || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, video_url: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to keep current or upload new video below
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Upload New Video</Label>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        setVideoFile(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label>Caption</Label>
                <Input
                  placeholder="Optional caption for this item"
                  value={formData.caption || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, caption: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.order || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit_is_active"
                  checked={formData.is_active ?? true}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                />
                <Label htmlFor="edit_is_active">Active</Label>
              </div>

              <Button
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
                className="w-full"
              >
                {updateMutation.isPending ? "Updating..." : "Update Gallery Item"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the gallery
                item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}

