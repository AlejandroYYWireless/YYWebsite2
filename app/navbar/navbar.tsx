"use client";
import { useEffect, useState } from "react";
import DesktopNavbar from "./NavbarTypes/DesktopNavbar";
import MobileNavbar from "./NavbarTypes/MobileNavbar";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 1280);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (isMobile) {
    return <MobileNavbar />;
  }
  return <DesktopNavbar />;
};

export default Navbar;
