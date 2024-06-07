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
      <div className="relative">
        <Framer>
          <FaComments size={40} onClick={toggleComments} className="md:hidden absolute top-[50px] right-[50px]" />
        </Framer>
      </div>
      <aside className={`fixed grid place-items-center w-full h-full backdrop-blur rounded-b-[25px] overflow-hidden transition-transform transform ${isVisible ? "translate-y-0" : "-translate-y-full"} md:hidden`}>
        <div className={`fixed w-[100%] h-[100%]  ${isVisible ? "block" : "hidden"}`} onClick={toggleComments}></div>
        <CommentsSection />
      </aside>
    </>
  );
}
export default CommentsToggle;
