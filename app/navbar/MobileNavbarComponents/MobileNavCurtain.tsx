"use client";
import { useMobileNavStore } from "./useMobileNavStore";
const MobileNavCurtain = () => {
  const navOpen = useMobileNavStore((store) => store.navOpen);
  return <div></div>;
};

export default MobileNavCurtain;
