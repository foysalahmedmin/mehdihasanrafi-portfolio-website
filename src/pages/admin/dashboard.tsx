import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, FolderKanban, FileText } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your content from here
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage</div>
            <p className="text-xs text-muted-foreground">
              Create and manage news articles
            </p>
            <Link href="/admin/news">
              <button className="mt-2 text-sm text-primary hover:underline">
                Go to News →
              </button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage</div>
            <p className="text-xs text-muted-foreground">
              Create and manage projects
            </p>
            <Link href="/admin/projects">
              <button className="mt-2 text-sm text-primary hover:underline">
                Go to Projects →
              </button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage</div>
            <p className="text-xs text-muted-foreground">
              Create and manage publications
            </p>
            <Link href="/admin/publications">
              <button className="mt-2 text-sm text-primary hover:underline">
                Go to Publications →
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

