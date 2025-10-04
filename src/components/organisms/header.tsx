"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { IconRoute } from "@tabler/icons-react";

import Navbar from "@molecules/navbar";
import AvatarMenu from "@molecules/menu/avatar-menu";
import BurgerMenu from "@molecules/menu/burger-menu";
import navbarLinks from "@config/navbar-links";

export default function Header() {
  const t = useTranslations("");

  return (
    <header className="sticky top-0 bg-primary-foreground h-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t-0 border-2 border-secondary rounded-b-xl">
      <div className="flex h-16 items-center justify-between">
        <Link href="/">
          <span className="sr-only">{t("website-name")}</span>
          <IconRoute aria-hidden="true" className="md:w-8 md:h-8" />
        </Link>
        <div className="hidden md:flex ml-10 items-baseline space-x-4">
          <Navbar navbarLinks={navbarLinks} />
        </div>
        <div className="flex gap-4">
          <BurgerMenu navbarLinks={navbarLinks} />
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
}
