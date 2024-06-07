"use client";
import { useState } from "react";
import CommentsSection from "./CommentsSection";
import { FaComments } from "react-icons/fa6";
import Framer from "./magnetic/Magnetic";

function CommentsToggle() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleComments = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="relative smallDisplayNone">
        <Framer>
          <FaComments size={40} onClick={toggleComments} className="absolute top-[50px] right-[50px]" />
        </Framer>
      </div>
      <aside className={`smallDisplay ${isVisible ? "translate-y-0" : "-translate-y-full"} `}>
        <div className={`fixed w-[100%] h-[100%] smallDisplayNone ${isVisible ? "block" : "hidden"}`} onClick={toggleComments}></div>
        <CommentsSection />
      </aside>
      {/* <aside className="p-[15px] flex-1 hidden md:block">
        <CommentsSection />
      </aside> */}
    </>
  );
}
export default CommentsToggle;
