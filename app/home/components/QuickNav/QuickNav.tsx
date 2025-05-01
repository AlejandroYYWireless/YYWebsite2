"use client";

import { useState, useRef, useEffect } from "react";

type TabRef = HTMLDivElement | null;

interface IndicatorStyle {
  width?: string;
  left?: string;
  height?: string;
  top?: string;
  opacity: number;
}

const QuickNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [hoverTab, setHoverTab] = useState<number | null>(null);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const tabRefs = useRef<Array<TabRef>>([]);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    opacity: 0,
  });
  const [navPosition, setNavPosition] = useState<number>(0);

  const tabs: string[] = [
    "Templates",
    "Design Intelligence",
    "Creative Tools",
    "SEO & Analytics",
  ];

  // Store the initial position of the nav
  useEffect(() => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setNavPosition(rect.top + window.scrollY);
    }
  }, []);

  // Scroll event with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Use the stored position rather than recalculating on every scroll
          setIsFixed(scrollY > navPosition - 20); // 50px offset from top
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navPosition]);

  useEffect(() => {
    // Update indicator when active/hover state changes
    if (hoverTab !== null && tabRefs.current[hoverTab]) {
      showIndicator(hoverTab);
    } else if (activeTab !== null && tabRefs.current[activeTab]) {
      showIndicator(activeTab);
    } else {
      hideIndicator();
    }

    const handleResize = (): void => {
      if (hoverTab !== null) {
        showIndicator(hoverTab);
      } else if (activeTab !== null) {
        showIndicator(activeTab);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, hoverTab]);

  const showIndicator = (index: number): void => {
    if (!tabRefs.current[index]) return;

    const tab = tabRefs.current[index];
    if (tab) {
      // For the first tab (leftmost), extend the indicator closer to the left edge
      // For the last tab (rightmost), extend the indicator closer to the right edge
      let adjustedLeft = tab.offsetLeft;
      let adjustedWidth = tab.offsetWidth;

      if (index === 0) {
        // Extend leftmost tab indicator closer to the left edge (accounting for padding)
        adjustedLeft = 6; // Add a small 6px buffer from the edge
        adjustedWidth = tab.offsetLeft + tab.offsetWidth - 6;
      } else if (index === tabs.length - 1) {
        // Extend rightmost tab indicator closer to the right edge
        const navWidth = navRef.current?.offsetWidth || 0;
        adjustedWidth = navWidth - tab.offsetLeft - 6; // Add a small 6px buffer from the edge
      }

      setIndicatorStyle({
        width: `${adjustedWidth}px`,
        left: `${adjustedLeft}px`,
        height: `${tab.offsetHeight}px`,
        top: `${tab.offsetTop}px`,
        opacity: 1,
      });
    }
  };

  const hideIndicator = (): void => {
    setIndicatorStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  const handleHover = (index: number): void => {
    setHoverTab(index);
  };

  const handleHoverEnd = (): void => {
    setHoverTab(null);
    // If there's no active tab, fade out the indicator
    if (activeTab === null) {
      hideIndicator();
    }
  };

  const handleClick = (index: number): void => {
    // If clicking the already active tab, deselect it
    if (activeTab === index) {
      setActiveTab(null);
    } else {
      setActiveTab(index);
    }
  };

  return (
    <>
      {/* Placeholder div to prevent layout shift when switching to fixed */}
      {isFixed && <div style={{ height: navRef.current?.offsetHeight || 0 }} />}

      <div
        ref={navRef}
        className={`rounded-[60px]  bg-stone-950/45 backdrop-blur-xl p-1 transition-all duration-300 ${
          isFixed
            ? "fixed top-[20px] left-0 right-0 z-50 mx-auto w-fit"
            : "relative"
        }`}
      >
        {/* Background indicator */}
        <div
          className="absolute bg-neutral-600/30  rounded-[60px] transition-all duration-300 ease-in-out z-0"
          style={indicatorStyle}
        />

        {/* Tabs */}
        <div className="flex">
          {tabs.map((tab, index) => (
            <div
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={`relative text-sm z-10 py-3 px-4 cursor-pointer text-white mx-1`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleHoverEnd}
              onClick={() => handleClick(index)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuickNav;
