"use client"

import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify';
import {
  FileBarChart2 as VisualizationsIcon,
  LogIn as PredictionsIcon,
  User as ProfileIcon,
  LogOut as LogoutIcon,
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

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Show the logout notification
    toast.success('Logout successful!', {
      position: "top-right",
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

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
      title: "Logout",
      onClick: handleLogout,
      icon: LogoutIcon,
    },
  ];

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
                    {item.url ? (
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="w-10 h-10" />
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <button onClick={item.onClick} className="flex items-center gap-3 w-full">
                        <item.icon className="w-10 h-10" />
                        <span>{item.title}</span>
                      </button>
                    )}
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
