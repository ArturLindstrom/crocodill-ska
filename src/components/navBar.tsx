"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavLink, useLoaderData } from "react-router-dom";
import ThemeToggle from "./themes/themeToggle";
import { Preschool } from "@/types";

const NavBar = () => {
  const { data } = useLoaderData() as { data: Preschool[] };

  return (
    <div className="flex items-center justify-between pr-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Förskolor</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-4 md:w-[200px] lg:w-[300px] lg:grid-cols-[.75fr_1fr] ">
                {data.map((preschool: Preschool) => (
                  <ListItem
                    key={preschool.preschool_id}
                    href={`/förskolor/${preschool.preschool_id}`}
                    title={preschool.name}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle />
    </div>
  );
};

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children?: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            isActive ? "bg-accent text-accent-foreground" : "",
            className
          )
        }
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
          {children}
        </p>
      </NavLink>
    </li>
  );
};

export default NavBar;
