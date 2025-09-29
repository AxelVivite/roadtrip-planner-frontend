"use client";

import * as React from "react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@atoms/popover";
import { Button } from "@atoms/button";
import { IconMenu2 } from "@tabler/icons-react";
import { NavbarLink } from "@config/navbar-links";
import { useTranslations } from "next-intl";

interface Props {
  navbarLinks: NavbarLink[];
}

export default function BurgerMenu({ navbarLinks }: Props) {
  const t = useTranslations("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex md:hidden items-center">
          <span className="sr-only">{t("molecules.burger-menu.open-main-menu")}</span>
          <IconMenu2 aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 block md:hidden">
        <div className="flex flex-col gap-2">
          {navbarLinks.map((link) => (
            <Button asChild size="lg" variant="outline" key={link.id}>
              <Link href={link.href}>{t(`config.navbar.${link.id}`)}</Link>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
