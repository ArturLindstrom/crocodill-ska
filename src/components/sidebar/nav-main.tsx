"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { Preschool } from "@/types";

type NavMainProps = {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  preschools?: Preschool[];
  isLoading?: boolean;
  error?: Error | null;
};

export function NavMain({ items, preschools, isLoading, error }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.title === "Förskolor" ? (
                    <>
                      {isLoading && (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Laddar förskolor...</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                      {error && (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Kunde inte ladda förskolor</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                      {!isLoading &&
                        !error &&
                        preschools?.map((preschool) => (
                          <SidebarMenuSubItem key={preschool.preschool_id}>
                            <NavLink
                              to={`/preschool/${preschool.preschool_id}`}
                              className={({ isActive }) =>
                                `block w-full rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                  isActive
                                    ? "bg-accent text-accent-foreground"
                                    : ""
                                }`
                              }
                            >
                              {preschool.name}
                            </NavLink>
                          </SidebarMenuSubItem>
                        ))}
                    </>
                  ) : (
                    item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <NavLink
                          to={subItem.url}
                          className={({ isActive }) =>
                            `block w-full rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                              isActive ? "bg-accent text-accent-foreground" : ""
                            }`
                          }
                        >
                          {subItem.title}
                        </NavLink>
                      </SidebarMenuSubItem>
                    ))
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
