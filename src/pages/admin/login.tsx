import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/states/useUser";
import { useToast } from "@/hooks/utils/useToast";
import { signIn } from "@/services/auth.service";
import { useState } from "react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { setUser } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signIn({
        email: formData.email,
        password: formData.password,
      });

      if (response.success && response.data?.token && response.data?.info) {
        setUser({
          is_authenticated: true,
          token: response.data.token,
          info: response.data.info,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            is_authenticated: true,
            token: response.data.token,
            info: response.data.info,
          }),
        );

        const role = response.data.info.role;
        if (role === "admin" || role === "super-admin" || role === "author") {
          toast({
            title: "Login successful!",
            description: "Welcome to the admin panel",
          });
          setLocation("/admin");
        } else {
          toast({
            title: "Access denied",
            description: "Admin access required",
            variant: "destructive",
          });
          setUser({
            is_authenticated: false,
            token: "",
            info: undefined,
          });
        }
      } else {
        toast({
          title: "Login failed",
          description: response.message || "Please check your credentials",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
