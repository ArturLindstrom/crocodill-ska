"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./themes/themeToggle";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between pr-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Förskolor</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-4 md:w-[200px] lg:w-[300px] lg:grid-cols-[.75fr_1fr] ">
                <ListItem href="/förskolor/ilcrocodill" title="Il Crocodill" />
                <ListItem
                  href="/förskolor/entillcrocodill"
                  title="Entill Crocodill"
                />
                <ListItem
                  href="/förskolor/lillcrocodill"
                  title="Lill Crocodill"
                />
                <ListItem href="förskolor/afcrocodill" title="Af Crocodill" />
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
