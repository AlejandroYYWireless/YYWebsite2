"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import DesktopNavbarLinks from "../DesktopNavbarLinks";
import Link from "next/link";

const DesktopNavbar = () => {
  const [navState, setNavState] = useState<"visible" | "hidden">("visible");
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
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
    <>
      {/* This code looks good and needs to remain untouched */}
      <nav
        className={`fixed top-0 left-0 p-2 w-full transition-all duration-300 z-50 ${
          navState === "visible"
            ? (isAtTop && !activeMenu ? "bg-transparent" : "bg-black") +
              " text-white"
            : "-translate-y-full bg-transparent text-white"
        }`}
      >
        {/* Rest of code up for grabs */}
        <div className="flex justify-between items-center text-sm px-8">
          <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
            <Image
              src={"/images/internal/YYWirelessSmallDark.svg"}
              alt="YYWireless Company Logo, an image of a circle with two Y's in it."
              className="shrink-0 cursor-pointer"
              width={65}
              height={65}
            />
            <p className="text-3xl">YYWireless</p>
          </Link>

          {/* Using the DesktopNavbarLinks component */}
          <DesktopNavbarLinks
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            setShowOverlay={setShowOverlay}
          />

          <div className="flex gap-8">
            <button className="uppercase cursor-pointer bg-transparent border-none text-sm">
              LOG IN
            </button>
            <button className="cursor-pointer bg-white text-black py-5 px-8 normal-semibold hover:bg-gray-300 transition duration-300">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DesktopNavbar;
