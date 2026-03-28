"use client";
import { ReactNode } from "react";
import { NavbarItemTitle } from "./navbar-item-title";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/react";
import Link from "next/link";

export type DropdownNavItem = {
  key: string;
  title: string;
  logo: ReactNode;
  description: string;
  href: string;
  isExternal?: boolean;
};

export type NavLink = {
  key: string;
  label: string;
  isDropdown: boolean;
  href?: string;
  isExternal?: boolean;
  dropdownItems?: DropdownNavItem[];
};

export interface NavbarItemProps {
  item: NavLink;
  activeLink: string;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({ item, activeLink }) => {
  if (!item.isDropdown) {
    return <NavbarItemTitle item={item} activeLink={activeLink} />;
  }

  return (
    <Dropdown shouldCloseOnScroll={false}>
      <DropdownTrigger>
        <Button
          disableAnimation
          className="p-0 min-w-0 bg-transparent shadow-none border-none"
        >
          <NavbarItemTitle item={item} activeLink={activeLink} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu items={item.dropdownItems!}>
        {(dropdown_item) => (
          <DropdownItem
            key={dropdown_item.key}
            description={dropdown_item.description}
            startContent={dropdown_item.logo}
            className="no-underline text-(--azul-electrico)"
          >
            <Link href={dropdown_item.href} className="no-underline">
              {dropdown_item.title}
            </Link>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
