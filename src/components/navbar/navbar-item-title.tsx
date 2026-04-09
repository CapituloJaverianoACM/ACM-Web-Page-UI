import { ChevronDown, ExternalLinkIcon } from "lucide-react";
import { NavbarItemProps } from "./navbar-item";
import Link from "next/link";
import React from "react";

export const NavbarItemTitle: React.FC<NavbarItemProps> = ({
  item,
  activeLink,
}) => {
  const isActive = activeLink === item.key;
  const Item = !item.isDropdown ? Link : "div";

  return (
    <Item
      {...(!item.isDropdown && { href: item.href })}
      {...(item.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className="no-underline"
    >
      <div
        className={`relative px-0 py-0 cursor-pointer transition-colors ${
          isActive
            ? "text-(--azul-electrico) dark:text-(--azul-niebla)"
            : "text-black dark:text-white"
        }`}
        style={{
          textDecoration: "none",
          transition: "color var(--transition-normal)",
        }}
      >
        <div className="text-lg font-semibold relative mb-0 hover:cursor-pointer flex items-center gap-0">
          <span>{item.label}</span>

          {item.isDropdown && (
            <ChevronDown className="w-5 h-5" style={{ marginTop: "-2px" }} />
          )}

          {item.isExternal && (
            <ExternalLinkIcon
              className="w-4 h-4 mx-0.5"
              style={{ marginTop: "-3px" }}
            />
          )}
        </div>

        <span
          className="absolute bottom-0 left-1/2 h-0.75 rounded-sm transform -translate-x-[70%] bg-(--azul-electrico) dark:bg-(--azul-niebla)"
          style={{
            width: isActive ? "38px" : "0px",
            transition: "width var(--transition-normal)",
          }}
        />
      </div>
    </Item>
  );
};
