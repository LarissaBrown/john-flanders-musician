import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";

export const metadata: Metadata = {
  title: "John Flanders - Multi-Instrumentalist Musician",
  description: "Professional musician bringing the soulful sounds of the Southwest to life. Available for concerts, private events, weddings, and more.",
  keywords: "musician, multi-instrumentalist, John Flanders, live music, Southwest music, concerts, private events, weddings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
