'use client';
import { navItems } from "@/constants/navigationItems";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./modals/LoginModal";
import RegistrationModal from "./modals/RegistrationModal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth";

export default function Header() {

   const pathname = usePathname();
   const { isAuth, session, status, setAuthState } = useAuthStore()

   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

   const handleSignOut = async () => {
      try {
         await signOutFunc()
         setAuthState('unauthenticated', null)
      } catch (error) {
         console.error(error)
      }
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
            {status === 'loading' ? <div className="animate-spin">
               <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-6 h-6"
               >
                  <path 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                     d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
               </svg>
               </div> : isAuth
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