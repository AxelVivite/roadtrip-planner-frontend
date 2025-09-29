export interface NavbarLink {
  id: string;
  href: string;
}

const navbarLinks: NavbarLink[] = [
  { id: "list-countries", href: "/" },
  { id: "roadtrip-planning", href: "/planning" },
];

export default navbarLinks;
