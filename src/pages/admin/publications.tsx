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
  createPublication,
  deletePublication,
  getAllPublications,
  updatePublication,
  type CreatePublicationPayload,
  type UpdatePublicationPayload,
} from "@/services/publication.service";
import type { TPublication } from "@/types/publication.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "./layout";

type FileState = {
  file: File | null;
  existingUrl?: string;
  shouldRemove: boolean;
};

const publication_categories = [
  "Abstract",
  "Journal",
  "Conference",
  "Book chapter",
  "Others",
];

export default function AdminPublicationsPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] =
    useState<TPublication | null>(null);
  const [formData, setFormData] = useState<Partial<CreatePublicationPayload>>({
    title: "",
    slug: "",
    abstract: "",
    content: "",
    venue: "",
    status: "draft",
    is_featured: false,
  });

  // File states with management
  const [thumbnail, setThumbnail] = useState<FileState>({
    file: null,
    existingUrl: undefined,
    shouldRemove: false,
  });
  const [pdf, setPdf] = useState<FileState>({
    file: null,
    existingUrl: undefined,
    shouldRemove: false,
  });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const [tags, setTags] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-publications"],
    queryFn: getAllPublications,
  });

  const createMutation = useMutation({
    mutationFn: createPublication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-publications"] });
      toast({
        title: "Success",
        description: "Publication created successfully",
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to create publication",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePublicationPayload;
    }) => updatePublication(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-publications"] });
      toast({
        title: "Success",
        description: "Publication updated successfully",
      });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to update publication",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePublication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-publications"] });
      toast({
        title: "Success",
        description: "Publication deleted successfully",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to delete publication",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      abstract: "",
      content: "",
      venue: "",
      status: "draft",
      is_featured: false,
    });
    setThumbnail({ file: null, existingUrl: undefined, shouldRemove: false });
    setPdf({ file: null, existingUrl: undefined, shouldRemove: false });
    setImages([]);
    setExistingImages([]);
    setRemovedImages([]);
    setTags([]);
    setAuthors([]);
    setTagInput("");
    setAuthorInput("");
    setSelectedPublication(null);
  };

  const handleCreate = () => {
    if (!formData.title || !formData.slug || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate({
      ...formData,
      thumbnail: thumbnail.file || undefined,
      pdf: pdf.file || undefined,
      images: images.length > 0 ? images : undefined,
      tags: tags.length > 0 ? tags : undefined,
      authors: authors.length > 0 ? authors : undefined,
    } as CreatePublicationPayload);
  };

  const handleEdit = (publication: TPublication) => {
    setSelectedPublication(publication);
    setFormData({
      title: publication.title,
      slug: publication.slug,
      abstract: publication.abstract,
      content: publication.content,
      venue: publication.venue,
      description: publication.description,
      publisher: publication.publisher,
      journal: publication.journal,
      volume: publication.volume,
      code: publication.code,
      doi: publication.doi,
      category: publication.category,
      author: publication.author,
      status: publication.status || "draft",
      is_featured: publication.is_featured || false,
      read_time: publication.read_time,
      published_at: publication.published_at
        ? new Date(publication.published_at).toISOString().slice(0, 16)
        : undefined,
    });
    setTags(publication.tags || []);
    setAuthors(publication.authors || []);

    // Set existing files
    setThumbnail({
      file: null,
      existingUrl: publication.thumbnail ?? undefined,
      shouldRemove: false,
    });
    setPdf({
      file: null,
      existingUrl: publication.pdf ?? undefined,
      shouldRemove: false,
    });
    setExistingImages(publication.images || []);
    setRemovedImages([]);

    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedPublication || !formData.title || !formData.slug) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const payload: any = {
      ...formData,
      tags: tags.length > 0 ? tags : undefined,
      authors: authors.length > 0 ? authors : undefined,
    };

    // Handle thumbnail
    if (thumbnail.shouldRemove) {
      payload.thumbnail = null;
    } else if (thumbnail.file) {
      payload.thumbnail = thumbnail.file;
    } else {
      payload.thumbnail = selectedPublication.thumbnail || null;
    }

    // Handle PDF
    if (pdf.shouldRemove) {
      payload.pdf = null;
    } else if (pdf.file) {
      payload.pdf = pdf.file;
    } else {
      payload.pdf = selectedPublication.pdf || null;
    }

    // Handle images
    if (removedImages.length > 0) {
      payload.removed_images = removedImages;
    }
    if (images.length > 0) {
      payload.images = images;
    }

    updateMutation.mutate({
      id: selectedPublication._id,
      payload,
    });
  };

  const handleDelete = (publication: TPublication) => {
    setSelectedPublication(publication);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPublication) {
      deleteMutation.mutate(selectedPublication._id);
    }
  };

  // File management functions
  const handleThumbnailChange = (file: File | null) => {
    setThumbnail({
      file,
      existingUrl: thumbnail.existingUrl,
      shouldRemove: false,
    });
  };

  const removeExistingThumbnail = () => {
    setThumbnail({
      file: null,
      existingUrl: undefined,
      shouldRemove: true,
    });
  };

  const handlePdfChange = (file: File | null) => {
    setPdf({
      file,
      existingUrl: pdf.existingUrl,
      shouldRemove: false,
    });
  };

  const removeExistingPdf = () => {
    setPdf({
      file: null,
      existingUrl: undefined,
      shouldRemove: true,
    });
  };

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const removeExistingImage = (imageUrl: string) => {
    setExistingImages(existingImages.filter((img) => img !== imageUrl));
    setRemovedImages([...removedImages, imageUrl]);
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

  const addAuthor = () => {
    if (authorInput.trim() && !authors.includes(authorInput.trim())) {
      setAuthors([...authors, authorInput.trim()]);
      setAuthorInput("");
    }
  };

  const removeAuthor = (authorToRemove: string) => {
    setAuthors(authors.filter((author) => author !== authorToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleAuthorKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAuthor();
    }
  };

  const publications = data?.data || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Publications Management</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage publications
            </p>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Publication
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Publication</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new publication
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
                    <Select
                      value={formData.category || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {publication_categories.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Venue</Label>
                    <Input
                      value={formData.venue}
                      onChange={(e) =>
                        setFormData({ ...formData, venue: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Abstract</Label>
                  <Textarea
                    rows={4}
                    value={formData.abstract}
                    onChange={(e) =>
                      setFormData({ ...formData, abstract: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <TipTapEditor
                    content={formData.content || ""}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                    placeholder="Write the publication content here..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Journal</Label>
                    <Input
                      value={formData.journal || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, journal: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Publisher</Label>
                    <Input
                      value={formData.publisher || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, publisher: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Volume</Label>
                    <Input
                      value={formData.volume || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, volume: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Code</Label>
                    <Input
                      value={formData.code || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>DOI</Label>
                    <Input
                      value={formData.doi || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, doi: e.target.value })
                      }
                    />
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
                    <Label>Published At</Label>
                    <Input
                      type="datetime-local"
                      value={formData.published_at || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published_at: e.target.value,
                        })
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

                <div className="grid gap-4">
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
                  <Label>Authors</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={authorInput}
                        onChange={(e) => setAuthorInput(e.target.value)}
                        onKeyPress={handleAuthorKeyPress}
                        placeholder="Add an author and press Enter"
                      />
                      <Button
                        type="button"
                        onClick={addAuthor}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {authors.map((author) => (
                        <Badge
                          key={author}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {author}
                          <button
                            type="button"
                            onClick={() => removeAuthor(author)}
                            className="hover:text-destructive ml-1"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
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

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Thumbnail</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleThumbnailChange(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>PDF</Label>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        handlePdfChange(e.target.files?.[0] || null)
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
                        handleImagesChange(Array.from(e.target.files || []))
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4">
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
                  {createMutation.isPending
                    ? "Creating..."
                    : "Create Publication"}
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
                  <TableHead>Venue</TableHead>
                  <TableHead>Journal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publications.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.venue}</TableCell>
                    <TableCell>{item.journal || "-"}</TableCell>
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
                          onClick={() =>
                            setLocation(`/publications/${item.slug}`)
                          }
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
              <DialogTitle>Edit Publication</DialogTitle>
              <DialogDescription>Update publication details</DialogDescription>
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
                  <Select
                    value={formData.category || ""}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {publication_categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Venue</Label>
                  <Input
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Abstract</Label>
                <Textarea
                  rows={4}
                  value={formData.abstract}
                  onChange={(e) =>
                    setFormData({ ...formData, abstract: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <TipTapEditor
                  content={formData.content || ""}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Write the publication content here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Journal</Label>
                  <Input
                    value={formData.journal || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, journal: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Publisher</Label>
                  <Input
                    value={formData.publisher || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, publisher: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Volume</Label>
                  <Input
                    value={formData.volume || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, volume: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input
                    value={formData.code || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>DOI</Label>
                  <Input
                    value={formData.doi || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, doi: e.target.value })
                    }
                  />
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
                  <Label>Published At</Label>
                  <Input
                    type="datetime-local"
                    value={formData.published_at || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, published_at: e.target.value })
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

              <div className="grid gap-4">
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
                <Label>Authors</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={authorInput}
                      onChange={(e) => setAuthorInput(e.target.value)}
                      onKeyPress={handleAuthorKeyPress}
                      placeholder="Add an author and press Enter"
                    />
                    <Button type="button" onClick={addAuthor} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {authors.map((author) => (
                      <Badge
                        key={author}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {author}
                        <button
                          type="button"
                          onClick={() => removeAuthor(author)}
                          className="hover:text-destructive ml-1"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
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

              {/* File Management Section */}
              <div className="space-y-4">
                {/* Thumbnail Management */}
                <div className="space-y-2">
                  <Label>Thumbnail</Label>
                  {thumbnail.existingUrl && !thumbnail.shouldRemove ? (
                    <div className="flex items-center gap-2 rounded-md border p-2">
                      <span className="flex-1 truncate text-sm">
                        Current: {thumbnail.existingUrl.split("/").pop()}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeExistingThumbnail}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleThumbnailChange(e.target.files?.[0] || null)
                      }
                    />
                  )}
                  {thumbnail.shouldRemove && (
                    <p className="text-muted-foreground text-sm">
                      Thumbnail will be removed on save
                    </p>
                  )}
                </div>

                {/* PDF Management */}
                <div className="space-y-2">
                  <Label>PDF</Label>
                  {pdf.existingUrl && !pdf.shouldRemove ? (
                    <div className="flex items-center gap-2 rounded-md border p-2">
                      <span className="flex-1 truncate text-sm">
                        Current: {pdf.existingUrl.split("/").pop()}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeExistingPdf}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        handlePdfChange(e.target.files?.[0] || null)
                      }
                    />
                  )}
                  {pdf.shouldRemove && (
                    <p className="text-muted-foreground text-sm">
                      PDF will be removed on save
                    </p>
                  )}
                </div>

                {/* Additional Images Management */}
                <div className="space-y-2">
                  <Label>Additional Images</Label>

                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Current Images:</p>
                      {existingImages.map((imageUrl, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 rounded-md border p-2"
                        >
                          <span className="flex-1 truncate text-sm">
                            {imageUrl.split("/").pop()}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExistingImage(imageUrl)}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New Images Input */}
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      handleImagesChange(Array.from(e.target.files || []))
                    }
                  />

                  {/* Show selected new images */}
                  {images.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">New Images to Add:</p>
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="text-muted-foreground text-sm"
                        >
                          {image.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-4">
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
                {updateMutation.isPending
                  ? "Updating..."
                  : "Update Publication"}
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
                publication.
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
