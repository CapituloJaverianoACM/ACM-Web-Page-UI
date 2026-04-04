"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { NavbarItemTitle } from "./navbar-item-title";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/react";

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
  const router = useRouter();

  if (!item.isDropdown) {
    return <Button
      variant="light"
      disableRipple
      className="p-0 min-w-0 justify-start shadow-none border-none hover:bg-transparent data-[hover=true]:bg-transparent data-[pressed=true]:bg-transparent data-[focus=true]:bg-transparent"
    >
      <NavbarItemTitle item={item} activeLink={activeLink} />
    </Button>
  }

  const handleDropdownitem = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(href, "_blank", "noopener noreferrer");
    } else {
      router.push(href);
    }
  };

  return (
    <Dropdown shouldCloseOnScroll={false}>
      <DropdownTrigger>
        <Button
          variant="light"
          disableRipple
          className="p-0 min-w-0 justify-start shadow-none border-none hover:bg-transparent data-[hover=true]:bg-transparent data-[pressed=true]:bg-transparent data-[focus=true]:bg-transparent"
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
            className="no-underline text-(--azul-electrico) cursor-pointer"
            onPress={() =>
              handleDropdownitem(dropdown_item.href, dropdown_item.isExternal)
            }
          >
            {dropdown_item.title}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
