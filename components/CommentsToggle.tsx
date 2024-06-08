"use client";
import { useEffect, useState } from "react";
import CommentsSection from "./CommentsSection";
import { FaComments } from "react-icons/fa6";
import Framer from "./magnetic/Magnetic";

function CommentsToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);

  const toggleComments = () => {
    setIsVisible(!isVisible);
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 900);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative smallDisplayNone">
        <Framer>
          <FaComments size={40} onClick={toggleComments} className="absolute top-[50px] right-[50px]" />
        </Framer>
      </div>
      <aside className={`smallDisplay ${isSmallScreen ? (isVisible ? "translate-y-0" : "-translate-y-full") : ""}`}>
        <div className={`fixed w-[100%] h-[100%] smallDisplayNone ${isVisible ? "block" : "hidden"}`} onClick={toggleComments}></div>
        <span className="smallDisplayNone absolute z-50 bottom-[5vh] bg-rose-800 p-[15px] rounded cursor-pointer active:bg-rose-900" onClick={toggleComments}>
          X
        </span>
        <CommentsSection />
      </aside>
    </>
  );
}
export default CommentsToggle;
