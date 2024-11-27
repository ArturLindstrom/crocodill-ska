"use client";

import * as React from "react";
import {
  ChartColumnDecreasing,
  FileText,
  MessageCircleQuestion,
  Plus,
  School,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAllPreschools } from "@/api/preschools/preschoolQueries";
import NavTools from "./nav-tools";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Förskolor",
      url: "#",
      icon: School,
      isActive: true,
      items: [],
    },
    {
      title: "Dokumentationer",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Lägg till dokumentation",
          url: "add-documentation",
        },
      ],
    },
    {
      title: "Statistik",
      url: "#",
      icon: ChartColumnDecreasing,
      items: [
        {
          title: "Förskolestatistik",
          url: "#",
        },
        {
          title: "Barnstatistik",
          url: "#",
        },
        {
          title: "Områdesstatistik",
          url: "#",
        },
      ],
    },
  ],
  tools: [
    {
      name: "Lägg till förskola",
      url: "#",
      icon: Plus,
    },
    {
      name: "Support",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: preschools, isLoading, error } = useAllPreschools();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain
          preschools={preschools}
          items={data.navMain}
          isLoading={isLoading}
          error={error}
        />
        <NavTools tools={data.tools} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
