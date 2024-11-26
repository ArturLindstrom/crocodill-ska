import * as React from "react";
import {
  ChartNoAxesColumn,
  ChevronRight,
  FileText,
  School,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink, useLoaderData } from "react-router-dom";
import { Preschool } from "@/types";

const documentations = [
  {
    title: "Lägg till dokumentation",
    url: "/Lägg till dokumentation",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: preschools } = useLoaderData() as { data: Preschool[] };
  return (
    <Sidebar {...props}>
      <SidebarHeader>Crocodill SKA</SidebarHeader>
      <SidebarContent className="gap-0">
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="text-sm group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                <School className="w-8 h-8 mr-2" />
                {"Förskolor "}
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {preschools.map((preschool) => (
                    <SidebarMenuItem key={preschool.preschool_id}>
                      <NavLink to={`/förskolor/${preschool.preschool_id}`}>
                        {({ isActive }) => (
                          <SidebarMenuButton isActive={isActive}>
                            {preschool.name}
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="text-sm group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                <FileText className="w-8 h-8 mr-2" />
                {"Dokumentationer"}
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {documentations.map((documentation) => (
                    <SidebarMenuItem key={documentation.title}>
                      <NavLink to={documentation.url}>
                        {({ isActive }) => (
                          <SidebarMenuButton isActive={isActive}>
                            {documentation.title}
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to={"/"}>
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <ChartNoAxesColumn />
                      Statistik
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
