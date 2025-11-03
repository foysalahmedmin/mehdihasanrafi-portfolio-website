import { TipTapEditor } from "@/components/editor/TipTapEditor";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/utils/useToast";
import {
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
  type CreateNewsPayload,
  type UpdateNewsPayload,
} from "@/services/news.service";
import type { TNews } from "@/types/news.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "./layout";

export default function AdminNewsPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<TNews | null>(null);
  const [formData, setFormData] = useState<Partial<CreateNewsPayload>>({
    title: "",
    slug: "",
    content: "",
    category: "",
    status: "draft",
    is_featured: false,
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: getAllNews,
  });

  const createMutation = useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast({
        title: "Success",
        description: "News created successfully",
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to create news",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateNewsPayload }) =>
      updateNews(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast({
        title: "Success",
        description: "News updated successfully",
      });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to update news",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast({
        title: "Success",
        description: "News deleted successfully",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to delete news",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      category: "",
      status: "draft",
      is_featured: false,
    });
    setThumbnail(null);
    setImages([]);
    setTags([]);
    setTagInput("");
    setSelectedNews(null);
  };

  const handleCreate = () => {
    if (
      !formData.title ||
      !formData.slug ||
      !formData.content ||
      !formData.category
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate({
      ...formData,
      thumbnail: thumbnail || undefined,
      images: images.length > 0 ? images : undefined,
      tags: tags.length > 0 ? tags : undefined,
    } as CreateNewsPayload);
  };

  const handleEdit = (news: TNews) => {
    setSelectedNews(news);
    setFormData({
      title: news.title,
      slug: news.slug,
      content: news.content,
      category: news.category,
      description: news.description,
      link: news.link,
      author: news.author,
      video: news.video,
      youtube: news.youtube,
      read_time: news.read_time,
      published_at: news.published_at
        ? new Date(news.published_at).toISOString()
        : undefined,
      status: news.status || "draft",
      is_featured: news.is_featured || false,
    });
    setTags(news.tags || []);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (
      !selectedNews ||
      !formData.title ||
      !formData.slug ||
      !formData.content
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    updateMutation.mutate({
      id: selectedNews._id,
      payload: {
        ...formData,
        thumbnail: thumbnail || undefined,
        images: images.length > 0 ? images : undefined,
        tags: tags.length > 0 ? tags : undefined,
      },
    });
  };

  const handleDelete = (news: TNews) => {
    setSelectedNews(news);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedNews) {
      deleteMutation.mutate(selectedNews._id);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const news = data?.data || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">News Management</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage news articles
            </p>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add News
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create News</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new news article
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug *</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Input
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Author</Label>
                    <Input
                      value={formData.author || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content *</Label>
                  <TipTapEditor
                    content={formData.content || ""}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                    placeholder="Write the news content here..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Link</Label>
                    <Input
                      value={formData.link || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>YouTube URL</Label>
                    <Input
                      value={formData.youtube || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, youtube: e.target.value })
                      }
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Published At</Label>
                  <Input
                    type="datetime-local"
                    value={formData.published_at || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, published_at: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        placeholder="Add a tag and press Enter"
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-destructive ml-1"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Thumbnail</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setThumbnail(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Additional Images</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        setImages(Array.from(e.target.files || []))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Read Time</Label>
                    <Input
                      value={formData.read_time || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, read_time: e.target.value })
                      }
                      placeholder="5 min read"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.is_featured}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_featured: e.target.checked,
                        })
                      }
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                </div>

                <Button
                  onClick={handleCreate}
                  disabled={createMutation.isPending}
                  className="w-full"
                >
                  {createMutation.isPending ? "Creating..." : "Create News"}
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
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "published"
                            ? "default"
                            : item.status === "draft"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.is_featured ? (
                        <Badge variant="default">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setLocation(`/news/${item.slug}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
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
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit News</DialogTitle>
              <DialogDescription>Update news article details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input
                    value={formData.author || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Content *</Label>
                <TipTapEditor
                  content={formData.content || ""}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Write the news content here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Link</Label>
                  <Input
                    value={formData.link || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>YouTube URL</Label>
                  <Input
                    value={formData.youtube || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, youtube: e.target.value })
                    }
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Published At</Label>
                <Input
                  type="datetime-local"
                  value={formData.published_at || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, published_at: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      placeholder="Add a tag and press Enter"
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-destructive ml-1"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Thumbnail (leave empty to keep current)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Additional Images</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setImages(Array.from(e.target.files || []))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Read Time</Label>
                  <Input
                    value={formData.read_time || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, read_time: e.target.value })
                    }
                    placeholder="5 min read"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={formData.is_featured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_featured: e.target.checked,
                      })
                    }
                  />
                  <Label htmlFor="edit-featured">Featured</Label>
                </div>
              </div>

              <Button
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
                className="w-full"
              >
                {updateMutation.isPending ? "Updating..." : "Update News"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                news article.
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
