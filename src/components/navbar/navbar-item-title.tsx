import { ChevronDown, ExternalLinkIcon } from "lucide-react";
import { NavbarItemProps } from "./navbar-item";
import Link from "next/link";
import React from "react";

export const NavbarItemTitle: React.FC<NavbarItemProps> = ({
  item,
  activeLink,
}) => {
  const Item = !item.isDropdown ? Link : "div";
  return (
    <Item
      {...(!item.isDropdown && { href: item.href })}
      {...(item.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className="no-underline"
    >
      <div
        className={`px-4 py-3 cursor-pointer hover:bg-default-100 transition-colors  ${
          activeLink === item.key
            ? "text-(--azul-electrico) dark:text-(--azul-niebla)"
            : "text-(--azul-noche) dark:text-white"
        }`}
        style={{
          textDecoration: "none",
          transition: "color var(--transition-normal)",
        }}
      >
        <div className="flex justify-center">
          {item.label}
          {item.isDropdown && <ChevronDown />}
          {item.isExternal && <ExternalLinkIcon className="mx-1.5" />}
        </div>
        <span
          className={`absolute bottom-0 left-1/2 h-0.75 rounded-sm transform -translate-x-[70%] bg-(--azul-electrico) dark:bg-(--azul-niebla)`}
          style={{
            width: activeLink === item.key ? "30px" : "0",
            transition: "width var(--transition-normal)",
          }}
        ></span>
      </div>
    </Item>
  );
};
