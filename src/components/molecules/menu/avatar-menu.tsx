"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@atoms/shadcn/dropdown-menu";
import { Avatar, AvatarFallback } from "@atoms/shadcn/avatar";
import useAuth from "@utils/hook/use-auth";

export default function AvatarMenu({}) {
  const { username, logout } = useAuth();
  const { theme, setTheme, systemTheme } = useTheme();
  const tAvatarMenu = useTranslations("molecules.menu.avatar-menu");
  const [currentTheme, setCurrentTheme] = React.useState(
    theme === "system" ? systemTheme : theme
  );

  const handleSwitchTheme = () => {
    console.log(currentTheme)
    if (currentTheme === "light") {
      setTheme("dark");
      setCurrentTheme("dark");
    } else if (currentTheme === "dark") {
      setTheme("light");
      setCurrentTheme("light");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="cursor-pointer" id="avatar-menu">
          <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleSwitchTheme}>
          {currentTheme === "dark" && tAvatarMenu("swap-light-mode")}
          {currentTheme === "light" && tAvatarMenu("swap-dark-mode")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {tAvatarMenu("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
