"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [containerOpen, setContainerOpen] = useState(false);

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
    setContainerOpen(true);
  };

  // Function to handle mouse leave with grace period
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setShowOverlay(false);
      setContainerOpen(false);
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

  // Get active content
  const activeContent = activeMenu ? menuContents[activeMenu] : null;

  // Function to calculate the horizontal sweep delay (left to right)
  const getCustomDelay = (columnIndex: number) => {
    // Create a horizontal pattern delay - only column index matters
    const maxColumns = 3; // We have 3 columns

    // Calculate percentage across the grid horizontally (0 to 1)
    const normalizedX = columnIndex / (maxColumns - 1);

    // Add the base delay of 0.1s, then add the progressive delay
    // Maximum additional delay of 0.3s to complete the sweep
    return 0.1 + normalizedX * 0.3;
  };

  // Container animation that handles both the container scale and opacity
  const containerVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0,
      transformOrigin: "top",
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        opacity: { duration: 0.4, ease: "easeOut" },
        scaleY: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        when: "beforeChildren",
        staggerChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      transition: {
        opacity: { duration: 0.3, ease: "easeIn" },
        scaleY: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        when: "afterChildren",
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  // Content animation that only handles the opacity and staggering of children
  const contentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.01, // Faster stagger for quicker text disappearance
        staggerDirection: -1,
      },
    },
  };

  // Animation variants for individual items with custom delay function
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: custom,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: 5,
      transition: {
        duration: 0.1, // Super fast text fadeout (0.1s)
      },
    },
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
                activeMenu === menuKey ? "scale-y-[-1]" : ""
              }`}
              size={16}
            />
          </div>
        ))}
      </div>

      {/* Single dropdown container */}
      <AnimatePresence>
        {containerOpen && (
          <div
            className="absolute z-50"
            style={{
              top: "calc(100% + -10px)",
              left: "52%",
              transform: "translateX(-50%)",
              width: "800px",
              // Create an invisible hover margin
              padding: "10px",
              paddingTop: "20px",
              margin: "-10px",
              marginTop: "0px",
              pointerEvents: containerOpen ? "auto" : "none",
            }}
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="bg-black rounded-xl overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {activeContent && (
                <motion.div
                  key={activeMenu}
                  className="px-8 py-12"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.h2
                    className="text-xl font-semibold mb-6 text-white"
                    variants={itemVariants}
                    custom={0.1} // Apply base delay for title
                  >
                    {activeContent.title}
                  </motion.h2>
                  <div className="grid grid-cols-3 gap-8">
                    {activeContent.columns.map((column, colIndex) => (
                      <motion.div
                        key={colIndex}
                        className="col-span-1"
                        variants={contentVariants}
                      >
                        <motion.h3
                          className="text-lg font-medium mb-4 text-white"
                          variants={itemVariants}
                          custom={getCustomDelay(colIndex)}
                        >
                          {column.heading}
                        </motion.h3>
                        <ul className="space-y-3">
                          {column.links.map((link, linkIndex) => (
                            <motion.li
                              key={linkIndex}
                              className="hover:text-gray-300 cursor-pointer text-white"
                              variants={itemVariants}
                              custom={getCustomDelay(colIndex)}
                            >
                              {link}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DesktopNavbarLinks;
