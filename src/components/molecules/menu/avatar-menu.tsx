"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@atoms/shadcn/dropdown-menu";
import { Avatar, AvatarFallback } from "@atoms/shadcn/avatar";
import useAuth from "@utils/auth/use-auth";

export default function AvatarMenu({}) {
  const { username, logout } = useAuth();
  const tAvatarMenu = useTranslations("molecules.menu.avatar-menu");

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLogout}>
          {tAvatarMenu("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
