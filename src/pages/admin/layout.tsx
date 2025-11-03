import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useUser from "@/hooks/states/useUser";
import { useToast } from "@/hooks/utils/useToast";
import {
  FileText,
  FolderKanban,
  Home,
  Images,
  LogOut,
  Newspaper,
} from "lucide-react";
import { Link, useLocation } from "wouter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      title: "Publications",
      icon: FileText,
      href: "/admin/publications",
    },
    {
      title: "Projects",
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "News",
      icon: Newspaper,
      href: "/admin/news",
    },
    {
      title: "Gallery",
      icon: Images,
      href: "/admin/gallery",
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        <Sidebar className="mt-16 h-[calc(100%-4rem)]">
          <SidebarHeader className="flex h-12 justify-center border-b font-semibold uppercase">
            <h3 className="px-2">Admin Panel</h3>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={"/admin"}>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarSeparator />
                  {menuItems?.map((item) => (
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
          </SidebarContent>
          <SidebarFooter className="flex h-12 items-center border-t">
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">
          <header className="flex h-12 items-center gap-4 border-b px-4">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <span className="text-muted-foreground text-sm">
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
