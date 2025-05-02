"use client";
import { useMobileNavStore } from "./useMobileNavStore";
const MobileNavCurtain = () => {
  const navOpen = useMobileNavStore((store) => store.navOpen);
  return <div>{navOpen ? "Curtain is open" : "Curtain is closed"}</div>;
};

export default MobileNavCurtain;
