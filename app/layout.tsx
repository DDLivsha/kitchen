import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import Header from "@/components/UI/Header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Українська кухня",
   description: "Рецепти української кухні",
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {

   const session = await auth()

   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <SessionProvider session={session}>
               <HeroUIProvider>
                  <AppLoader>
                     <Header />
                     <main className="flex flex-col min-h-[calc(100vh-64px)] w-full justify-start items-center">{children}</main>
                  </AppLoader>
               </HeroUIProvider>
            </SessionProvider>
         </body>
      </html>
   );
}
