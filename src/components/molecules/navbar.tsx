"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@atoms/navigation-menu";
import { NavbarLink } from "@config/navbar-links";

interface Props {
  navbarLinks: NavbarLink[];
}

export default function Navbar({ navbarLinks }: Props) {
  const t = useTranslations("");

  return (
    <NavigationMenu aria-label={t("molecules.navbar.global")}>
      <NavigationMenuList>
        {navbarLinks.map((link) => (
          <NavigationMenuItem key={link.id}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={link.href}>{t(`config.navbar.${link.id}`)}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
