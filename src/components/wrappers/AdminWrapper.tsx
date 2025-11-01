import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import useUser from "@/hooks/states/useUser";

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is authenticated
      if (!user?.is_authenticated || !user?.info?._id) {
        setLocation("/admin/login");
        return;
      }

      // Check if user has admin role
      const role = user.info.role;
      if (role !== "admin" && role !== "super-admin" && role !== "author") {
        setLocation("/admin/login");
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [user, setLocation]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

