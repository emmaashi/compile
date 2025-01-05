import {
  FileBarChart2 as VisualizationsIcon,
  LogIn as PredictionsIcon,
  User as ProfileIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: HomeIcon,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: ProfileIcon,
  },
  {
    title: "Visualizations",
    url: "/visualizations",
    icon: VisualizationsIcon,
  },
  {
    title: "Predictions",
    url: "/predictions",
    icon: PredictionsIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <div className="p-4 flex justify-start items-center">
          <img
            src="/compile.png"
            alt="Compile Logo"
            className="w-50"
          />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-10 h-10" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
