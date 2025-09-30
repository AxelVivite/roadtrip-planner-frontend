"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { IconMenu2 } from "@tabler/icons-react";

import { Popover, PopoverContent, PopoverTrigger } from "@atoms/shadcn/popover";
import { Button } from "@atoms/shadcn/button";
import { NavbarLink } from "@config/navbar-links";

interface Properties {
  navbarLinks: NavbarLink[];
}

export default function BurgerMenu({ navbarLinks }: Properties) {
  const tBurgerMenu = useTranslations("molecules.menu.burger-menu");
  const tNavbar = useTranslations("config.navbar");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex md:hidden items-center">
          <span className="sr-only">{tBurgerMenu("open-main-menu")}</span>
          <IconMenu2 aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 block md:hidden">
        <div className="flex flex-col gap-2">
          {navbarLinks.map((link) => (
            <Button asChild size="lg" variant="outline" key={link.id}>
              <Link href={link.href}>{tNavbar(link.id)}</Link>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
