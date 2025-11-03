import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="bg-accent/20 flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
      <Card className="mx-4 w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="text-destructive h-8 w-8" />
            <CardTitle className="text-2xl">404 - Page Not Found</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-base">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
          <Link href="/">
            <Button className="w-full" data-testid="button-home">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
