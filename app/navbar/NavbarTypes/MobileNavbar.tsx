"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import MobileNavToggle from "../MobileNavbarComponents/MobileNavToggle";

const MobileNavbar = () => {
  const [navState, setNavState] = useState("visible");
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

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
        // Close any open menus when hiding navbar
        setActiveMenu(null);
        setShowOverlay(false);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (showOverlay) {
    console.log("for testing");
  }

  return (
    <div>
      {/* Added wrapping div element */}
      {/* This code looks good and needs to remain untouched */}
      <nav
        className={`fixed top-[-25] left-0 p-2 w-full transition-all duration-300 z-50 ${
          navState === "visible"
            ? (isAtTop && !activeMenu ? "bg-transparent" : "bg-black") +
              " text-white"
            : "-translate-y-full bg-transparent text-white"
        }`}
      >
        <div className="flex justify-between items-center m-2">
          {/* Added flex container */}
          <Image
            src="/images/brands/SquareSpaceSmall.svg"
            alt="Logo"
            width={50}
            height={50}
            className="w-8 h-8 p-0.5"
          />
          <div>
            <MobileNavToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbar;
