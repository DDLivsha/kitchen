'use client';
import { navItems } from "@/constants/navigationItems";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./modals/LoginModal";
import RegistrationModal from "./modals/RegistrationModal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useSession } from "next-auth/react";

export default function Header() {

   const pathname = usePathname();

   const { data: session, status } = useSession()
   const isAuth = status === 'authenticated'


   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

   const handleSignOut = async () => {
      await signOutFunc()
   }

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
            {isAuth
               ?
               <NavbarItem className="hidden lg:flex">
                  <Button
                     color="secondary"
                     onPress={handleSignOut}
                  >Sign out</Button>
               </NavbarItem>
               :
               <>
                  <NavbarItem className="hidden lg:flex">
                     <Button
                        color="secondary"
                        onPress={() => setIsLoginModalOpen(true)}
                     >Login</Button>
                  </NavbarItem>
                  <NavbarItem>
                     <Button
                        color="primary"
                        onPress={() => setIsRegisterModalOpen(true)}
                     >
                        Sign Up
                     </Button>
                  </NavbarItem>
               </>
            }
         </NavbarContent>
         <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
         />
         <RegistrationModal
            isOpen={isRegisterModalOpen}
            onClose={() => setIsRegisterModalOpen(false)}
         />
      </Navbar>
   );
}