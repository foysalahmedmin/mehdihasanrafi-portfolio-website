import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useUser from "@/hooks/states/useUser";
import { useToast } from "@/hooks/utils/useToast";
import { FileText, Home, LogOut, Newspaper, FolderKanban, Images } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { user, clearUser } = useUser();
  const { toast } = useToast();

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out",
    });
    setLocation("/admin/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/admin",
    },
    {
      title: "News",
      icon: Newspaper,
      href: "/admin/news",
    },
    {
      title: "Projects",
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "Publications",
      icon: FileText,
      href: "/admin/publications",
    },
    {
      title: "Gallery",
      icon: Images,
      href: "/admin/gallery",
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1">
          <header className="flex h-16 items-center gap-4 border-b px-4">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user?.info?.name || "Admin"}
              </span>
            </div>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

