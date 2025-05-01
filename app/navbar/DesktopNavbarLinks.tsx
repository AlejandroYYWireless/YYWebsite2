"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

// Define types for our props
interface DesktopNavbarLinksProps {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  setShowOverlay: (show: boolean) => void;
}

// Define our dropdown content structure
interface MenuContent {
  title: string;
  columns: {
    heading: string;
    links: string[];
  }[];
}

const DesktopNavbarLinks = ({
  activeMenu,
  setActiveMenu,
  setShowOverlay,
}: DesktopNavbarLinksProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Refs to store the positions of each menu item
  const menuItemsRef = useRef<Record<string, HTMLDivElement | null>>({});

  // Menu definitions
  const menuContents: Record<string, MenuContent> = {
    products: {
      title: "Our Products",
      columns: [
        {
          heading: "Websites",
          links: ["Portfolio", "Online Store", "Local Business", "Blogs"],
        },
        {
          heading: "Commerce",
          links: [
            "Online Store",
            "Point of Sale",
            "Subscriptions",
            "Scheduling",
          ],
        },
        {
          heading: "Marketing",
          links: ["Email Campaigns", "SEO Tools", "Social Media"],
        },
      ],
    },
    resources: {
      title: "Resources",
      columns: [
        {
          heading: "Learn",
          links: ["Blog", "Videos", "Webinars", "Guides"],
        },
        {
          heading: "Support",
          links: ["Help Center", "Forum", "Community", "Contact Us"],
        },
        {
          heading: "Inspiration",
          links: ["Gallery", "Success Stories", "Case Studies"],
        },
      ],
    },
  };

  // Function to handle mouse enter on navbar items
  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
    setShowOverlay(true);
  };

  // Function to handle mouse leave with grace period
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setShowOverlay(false);
    }, 300); // 300ms grace period
  };

  // Function to handle mouse enter on the menu to cancel the timeout
  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Ref callback function
  const setMenuItemRef = (menuKey: string) => (el: HTMLDivElement | null) => {
    menuItemsRef.current[menuKey] = el;
  };

  return (
    <>
      {/* Navigation Links */}
      <div className="flex items-center gap-8 text-sm">
        {Object.keys(menuContents).map((menuKey) => (
          <div
            key={menuKey}
            ref={setMenuItemRef(menuKey)}
            className="uppercase flex gap-1 items-center cursor-pointer py-4 px-2 relative"
            onMouseEnter={() => handleMouseEnter(menuKey)}
            onMouseLeave={handleMouseLeave}
          >
            {menuKey}{" "}
            <ChevronDown
              className={`transition-transform duration-300 ${
                activeMenu === menuKey ? "rotate-180" : ""
              }`}
              size={16}
            />
          </div>
        ))}
      </div>

      {/* Dropdown Containers */}
      {Object.entries(menuContents).map(([key, content]) => {
        return (
          <div
            key={key}
            className={`absolute bg-black z-50 rounded-xl transition-all duration-300 ${
              activeMenu === key
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              top: "calc(100% + 10px)",
              left: "52%",
              transform: "translateX(-50%)",
              width: "800px",

              // Create an invisible hover margin
              padding: "50px",
              paddingTop: "20px",
              margin: "-50px",
              marginTop: "0px",
            }}
          >
            <div className="px-8 py-12">
              <h2 className="text-xl font-semibold mb-6 text-white">
                {content.title}
              </h2>
              <div className="grid grid-cols-3 gap-8">
                {content.columns.map((column, i) => (
                  <div key={i} className="col-span-1">
                    <h3 className="text-lg font-medium mb-4 text-white">
                      {column.heading}
                    </h3>
                    <ul className="space-y-3">
                      {column.links.map((link, j) => (
                        <li
                          key={j}
                          className="hover:text-gray-300 cursor-pointer text-white"
                        >
                          {link}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DesktopNavbarLinks;
