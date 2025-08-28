'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

   const navItems = [
      {
         href: '/',
         label: 'Home',
      },
      {
         href: '/ingredients',
         label: 'Ingredients',
      },
      {
         href: '/about',
         label: 'About us',
      },
   ]

   const pathname = usePathname();

   return (
      <Navbar className="h-16">
         <NavbarBrand>
            <Link aria-label="Home" className="flex items-center gap-1" href="/">
               <p className="font-bold text-inherit">Kitchen</p>
            </Link>
         </NavbarBrand>
         <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {navItems.map((item) => (
               <NavbarItem key={item.href}>
                  <Link
                     className={`px-3 py-1 ${pathname === item.href ? 'text-blue-500' : 'text-foreground'} hover:text-blue-300 hover:rounded-md transition-all duration-200`}
                     href={item.href}
                  >
                     {item.label}
                  </Link>
               </NavbarItem>
            ))}
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