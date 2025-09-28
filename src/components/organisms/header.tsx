"use client";

import { IconRoute } from "@tabler/icons-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/atoms/navigation-menu";
import Link from "next/link";

const navigation = [
  { name: "Liste des pays", href: "#" },
  { name: "Détail d’un pays", href: "#" },
  { name: "Planification du roadtrip", href: "#" },
];

export default function Header() {
  return (
    <header>
      <NavigationMenu aria-label="Global">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">
                <span className="sr-only">Roadtrip planner</span>
                <IconRoute aria-hidden="true" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {navigation.map((link) => (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={link.href}>{link.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
