"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MobileNavCurtain from "../MobileNavbarComponents/MobileNavCurtain";
import MobileNavToggle from "../MobileNavbarComponents/MobileNavToggle";
import { useMobileNavStore } from "../MobileNavbarComponents/useMobileNavStore";
import Link from "next/link";

const MobileNavbar = () => {
  const [navState, setNavState] = useState("visible");
  const [isAtTop, setIsAtTop] = useState(true);
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const navOpen = useMobileNavStore((state) => state.navOpen);

  useEffect(() => {
    let lastScroll = window.scrollY;
    setIsAtTop(window.scrollY === 0);

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Check if at top of page
      setIsAtTop(currentScroll === 0);

      // Scrolling up - show with black background
      if (currentScroll < lastScroll) {
        setNavState("visible");
      }
      // Scrolling down - hide the navbar
      else if (currentScroll > lastScroll) {
        setNavState("hidden");
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Create a custom event handler for the toggle hover state
  const handleToggleHover = (isHovered: boolean) => {
    setIsToggleHovered(isHovered);
  };

  // Use either navOpen OR isToggleHovered to determine if we should show the black background
  const shouldShowBlackBg = navOpen || isToggleHovered;

  return (
    <div>
      <nav
        className={`fixed left-0 p-2 w-full transition-all duration-300 z-50 ${
          navState === "visible"
            ? (isAtTop && !shouldShowBlackBg ? "bg-transparent" : "bg-black") +
              " text-white"
            : "-translate-y-full bg-transparent text-white"
        }`}
      >
        <div className="flex justify-between items-center mx-2">
          <Link href={"/"}>
            <Image
              src={"/images/internal/YYWirelessSmallDark.svg"}
              alt="YYWireless Company Logo, an image of a circle with two Y's in it."
              className="shrink-0 cursor-pointer"
              width={45}
              height={45}
            />
          </Link>

          <div
            onMouseEnter={() => handleToggleHover(true)}
            onMouseLeave={() => handleToggleHover(false)}
          >
            <MobileNavToggle />
          </div>
        </div>
        <MobileNavCurtain />
      </nav>
    </div>
  );
};

export default MobileNavbar;
