import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderKanban, Images, Newspaper } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-6 lg:px-8 lg:py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your content from here
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Publications
                </CardTitle>
                <FileText className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Manage</div>
                <p className="text-muted-foreground text-xs">
                  Create and manage publications
                </p>
                <Link href="/admin/publications">
                  <button className="text-primary mt-2 text-sm hover:underline">
                    Go to Publications →
                  </button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projects</CardTitle>
                <FolderKanban className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Manage</div>
                <p className="text-muted-foreground text-xs">
                  Create and manage projects
                </p>
                <Link href="/admin/projects">
                  <button className="text-primary mt-2 text-sm hover:underline">
                    Go to Projects →
                  </button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">News</CardTitle>
                <Newspaper className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Manage</div>
                <p className="text-muted-foreground text-xs">
                  Create and manage news articles
                </p>
                <Link href="/admin/news">
                  <button className="text-primary mt-2 text-sm hover:underline">
                    Go to News →
                  </button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gallery</CardTitle>
                <Images className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Manage</div>
                <p className="text-muted-foreground text-xs">
                  Create and manage gallery
                </p>
                <Link href="/admin/gallery">
                  <button className="text-primary mt-2 text-sm hover:underline">
                    Go to Gallery →
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
