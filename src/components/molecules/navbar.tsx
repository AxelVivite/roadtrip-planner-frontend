"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@atoms/shadcn/navigation-menu";
import { NavbarLink } from "@config/navbar-links";

interface Properties {
  navbarLinks: NavbarLink[];
}

export default function Navbar({ navbarLinks }: Properties) {
  const pathname = usePathname();
  const t = useTranslations("");

  return (
    <NavigationMenu aria-label={t("molecules.navbar.global")}>
      <NavigationMenuList>
        {navbarLinks.map((link) => {
          const isActive = link.href === pathname;
          return (
            <NavigationMenuItem key={link.id}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                active={isActive}
              >
                <Link
                  href={link.href}
                  className={isActive ? "bg-muted" : "bg-primary-foreground"}
                >
                  {t(`config.navbar.${link.id}`)}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
