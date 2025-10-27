import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-accent/20">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <CardTitle className="text-2xl">404 - Page Not Found</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-base">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
          <Link href="/">
            <Button className="w-full" data-testid="button-home">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
