import type { Metadata } from "next";
import { Montserrat, Lora, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/navbar";

export const metadata: Metadata = {
  title: "YYWireless - Refurbished Electronics",
  description:
    "YYWireless is a leading provider of high-quality refurbished electronics, offering a wide range of products including smartphones, laptops, and accessories. Our mission is to provide customers with affordable, reliable, and eco-friendly technology solutions without compromising on quality or performance.",
};
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "100", "300", "900", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${lato.variable} ${lora.variable} font-montserrat antialiased`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
