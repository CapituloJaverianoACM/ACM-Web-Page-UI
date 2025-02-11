'use client';

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import Image from "next/image";

export default function MainNavbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Image src="/Logo_Oscuro.png" alt="ACM Logo" width={100} height={40} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="hover:text-blue-600" color="foreground" href="#hero">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="hover:text-blue-600" color="foreground" href="#about-us">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="hover:text-blue-600" color="foreground" href="#members">
            Members
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="hover:text-blue-600" color="foreground" href="#activities">
            Activities
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
