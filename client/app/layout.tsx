// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Roboto,Arimo } from "next/font/google";



export const metadata: Metadata = {
  title: "KeepVault - Secure Document Management System",
  description: "Your digital vault for sensitive documents. Secure, modern, and privacy-first document storage",

  icons: {
    icon: 'LOGO.png',
  },

  verification: {
    google: "oL4aejLeDtqxjfIYPPQBOg-GddA4_wZ5Nqi7WFNU_VQ",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--font-roboto", 
});

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--font-arimo", 
});



import { StoreProvider } from "./StoreProvider";
import AuthRehydrator from "@/components/layout/AuthRehydrator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     <body className={`${roboto.className} ${arimo.className}   bg-[#f8f2e5] dark:bg-[#1b1a01] font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <AuthRehydrator>
              <Navbar />
              {children}
              <Footer />
            </AuthRehydrator>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}