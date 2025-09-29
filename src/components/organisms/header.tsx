"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { IconRoute } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@atoms/avatar";
import Navbar from "@molecules/navbar";
import BurgerMenu from "@molecules/burger-menu";
import navbarLinks from "@config/navbar-links";

export default function Header() {
  const t = useTranslations("");

  return (
    <header className="shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <span className="sr-only">{t("website-name")}</span>
            <IconRoute aria-hidden="true" className="md:w-8 md:h-8" />
          </Link>
          <div className="hidden md:flex ml-10 items-baseline space-x-4">
            <Navbar navbarLinks={navbarLinks} />
          </div>
          <Avatar className="hidden md:block">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <BurgerMenu navbarLinks={navbarLinks} />
        </div>
      </div>
    </header>
  );
}
