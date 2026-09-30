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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Video,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/utils/useToast";
import {
  getAllGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} from "@/services/gallery.service";
import type { TGallery, TUpdateGalleryPayload } from "@/types/gallery.type";
import { getGalleryMediaUrl } from "@/utils/gallery-media";
import AdminLayout from "./layout";

const emptyCreateForm = {
  caption: "",
  is_active: true,
  image_url: "",
  video_url: "",
};

const emptyEditForm = {
  caption: "",
  order: 0,
  is_active: true,
  image_url: "",
  video_url: "",
};

export default function AdminGalleryPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<TGallery | null>(null);

  const [createForm, setCreateForm] = useState(emptyCreateForm);
  const [createFiles, setCreateFiles] = useState<File[]>([]);

  const [editForm, setEditForm] = useState(emptyEditForm);
  const [editFile, setEditFile] = useState<File | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: getAllGallery,
  });

  const invalidateGallery = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
    queryClient.invalidateQueries({ queryKey: ["/api/gallery/public"] });
  };

  const createMutation = useMutation({
    mutationFn: createGallery,
    onSuccess: (response) => {
      invalidateGallery();
      toast({
        title: "Success",
        description: response.message || "Gallery items created successfully",
      });
      setIsCreateDialogOpen(false);
      resetCreateForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to create gallery item(s)",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TUpdateGalleryPayload }) =>
      updateGallery(id, payload),
    onSuccess: () => {
      invalidateGallery();
      toast({
        title: "Success",
        description: "Gallery item updated successfully",
      });
      setIsEditDialogOpen(false);
      resetEditForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to update gallery item",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGallery,
    onSuccess: () => {
      invalidateGallery();
      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to delete gallery item",
        variant: "destructive",
      });
    },
  });

  const resetCreateForm = () => {
    setCreateForm(emptyCreateForm);
    setCreateFiles([]);
  };

  const resetEditForm = () => {
    setEditForm(emptyEditForm);
    setEditFile(null);
    setSelectedGallery(null);
  };

  const addCreateFiles = (files: File[]) => {
    setCreateFiles((prev) => [...prev, ...files]);
  };

  const removeCreateFile = (index: number) => {
    setCreateFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    const hasUrl = createForm.image_url.trim() || createForm.video_url.trim();
    if (createFiles.length === 0 && !hasUrl) {
      toast({
        title: "Nothing to add",
        description:
          "Select at least one image/video file, or provide an image or video URL",
        variant: "destructive",
      });
      return;
    }

    createMutation.mutate({
      files: createFiles,
      caption: createForm.caption.trim() || undefined,
      is_active: createForm.is_active,
      image_url: createForm.image_url.trim() || undefined,
      video_url: createForm.video_url.trim() || undefined,
    });
  };

  const handleEdit = (gallery: TGallery) => {
    setSelectedGallery(gallery);
    setEditForm({
      caption: gallery.caption || "",
      order: gallery.order,
      is_active: gallery.is_active,
      image_url: "",
      video_url: "",
    });
    setEditFile(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedGallery) return;

    updateMutation.mutate({
      id: selectedGallery._id,
      payload: {
        caption: editForm.caption,
        order: editForm.order,
        is_active: editForm.is_active,
        file: editFile || undefined,
        image_url: editForm.image_url.trim() || undefined,
        video_url: editForm.video_url.trim() || undefined,
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
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              setIsCreateDialogOpen(open);
              if (!open) resetCreateForm();
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={() => resetCreateForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Gallery Items
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Gallery Items</DialogTitle>
                <DialogDescription>
                  Upload multiple images and/or videos at once, or link one by
                  URL. Each becomes its own gallery item.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Upload Images / Videos</Label>
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => {
                      addCreateFiles(Array.from(e.target.files || []));
                      e.target.value = "";
                    }}
                  />
                  <p className="text-muted-foreground text-xs">
                    You can select multiple files, and add more in another
                    pick — they'll all be added below.
                  </p>
                  {createFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {createFiles.map((file, index) => (
                        <Badge
                          key={`${file.name}-${index}`}
                          variant="outline"
                          className="gap-1 py-1 pr-1 pl-2"
                        >
                          {file.type.startsWith("video/") ? (
                            <Video className="h-3 w-3" />
                          ) : (
                            <ImageIcon className="h-3 w-3" />
                          )}
                          <span className="max-w-40 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeCreateFile(index)}
                            className="hover:text-destructive ml-1 rounded-full"
                            aria-label={`Remove ${file.name}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Or Image URL</Label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={createForm.image_url}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, image_url: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Or Video URL</Label>
                    <Input
                      placeholder="https://example.com/video.mp4"
                      value={createForm.video_url}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, video_url: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Caption</Label>
                  <Input
                    placeholder="Optional caption applied to all items added now"
                    value={createForm.caption}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, caption: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="create_is_active"
                    checked={createForm.is_active}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, is_active: e.target.checked })
                    }
                  />
                  <Label htmlFor="create_is_active">Active (visible publicly)</Label>
                </div>

                <Button
                  onClick={handleCreate}
                  disabled={createMutation.isPending}
                  className="w-full"
                >
                  {createMutation.isPending
                    ? "Uploading..."
                    : `Add ${
                        createFiles.length +
                        (createForm.image_url.trim() ? 1 : 0) +
                        (createForm.video_url.trim() ? 1 : 0) || ""
                      } Gallery Item${
                        createFiles.length +
                          (createForm.image_url.trim() ? 1 : 0) +
                          (createForm.video_url.trim() ? 1 : 0) ===
                        1
                          ? ""
                          : "s"
                      }`}
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
                  const mediaUrl = getGalleryMediaUrl(item);
                  return (
                    <TableRow key={item._id}>
                      <TableCell>
                        {mediaUrl && (
                          <div className="relative h-20 w-20 overflow-hidden rounded">
                            {item.media_type === "image" ? (
                              <img
                                src={mediaUrl}
                                alt={item.caption || "Gallery item"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <video
                                src={mediaUrl}
                                className="h-full w-full object-cover"
                                muted
                              />
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.media_type === "image" ? "default" : "secondary"
                          }
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
                      <TableCell>{item.order}</TableCell>
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
                            <Trash2 className="text-destructive h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {gallery.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-muted-foreground py-10 text-center"
                    >
                      No gallery items yet — add your first one above.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) resetEditForm();
          }}
        >
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Gallery Item</DialogTitle>
              <DialogDescription>
                Update this item's details, or replace its{" "}
                {selectedGallery?.media_type || "media"}.
              </DialogDescription>
            </DialogHeader>
            {selectedGallery && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Current media</Label>
                    <Badge
                      variant={
                        selectedGallery.media_type === "image"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {selectedGallery.media_type === "image" ? (
                        <ImageIcon className="mr-1 h-3 w-3" />
                      ) : (
                        <Video className="mr-1 h-3 w-3" />
                      )}
                      {selectedGallery.media_type}
                    </Badge>
                  </div>
                  {selectedGallery.media_type === "image" ? (
                    <img
                      src={getGalleryMediaUrl(selectedGallery)}
                      alt="Current"
                      className="h-48 w-full rounded object-cover"
                    />
                  ) : (
                    <video
                      src={getGalleryMediaUrl(selectedGallery)}
                      controls
                      className="h-48 w-full rounded bg-black object-contain"
                    />
                  )}
                  <p className="text-muted-foreground text-xs">
                    An item's type ({selectedGallery.media_type}) can't be
                    changed — delete and re-add it to switch types.
                  </p>
                </div>

                {selectedGallery.media_type === "image" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Replace with new image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setEditFile(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Or replace with image URL</Label>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={editForm.image_url}
                        onChange={(e) =>
                          setEditForm({ ...editForm, image_url: e.target.value })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Replace with new video</Label>
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          setEditFile(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Or replace with video URL</Label>
                      <Input
                        placeholder="https://example.com/video.mp4"
                        value={editForm.video_url}
                        onChange={(e) =>
                          setEditForm({ ...editForm, video_url: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}
                <p className="text-muted-foreground -mt-2 text-xs">
                  Leave both blank to keep the current {selectedGallery.media_type}.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Caption</Label>
                    <Input
                      placeholder="Optional caption for this item"
                      value={editForm.caption}
                      onChange={(e) =>
                        setEditForm({ ...editForm, caption: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Order</Label>
                    <Input
                      type="number"
                      min="0"
                      value={editForm.order}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          order: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit_is_active"
                    checked={editForm.is_active}
                    onChange={(e) =>
                      setEditForm({ ...editForm, is_active: e.target.checked })
                    }
                  />
                  <Label htmlFor="edit_is_active">Active (visible publicly)</Label>
                </div>

                <Button
                  onClick={handleUpdate}
                  disabled={updateMutation.isPending}
                  className="w-full"
                >
                  {updateMutation.isPending ? "Updating..." : "Update Gallery Item"}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                gallery item and its file.
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
