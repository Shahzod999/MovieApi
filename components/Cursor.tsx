import React, { useEffect, useState, useRef } from "react";
import { animate, motion, transform, useMotionValue, useSpring } from "framer-motion";

interface CursorProps {
  stickyElement: React.RefObject<HTMLDivElement>;
}

const Cursor: React.FC<CursorProps> = ({ stickyElement }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorSize = isHovered ? 60 : 20;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOption = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOption),
    y: useSpring(mouse.y, smoothOption),
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  const rotate = (distance: { x: number; y: number }) => {
    const angle = Math.atan2(distance.y, distance.x);
    if (cursorRef.current) {
      animate(cursorRef.current, { rotate: `${angle}rad` }, { duration: 0 });
    }
  };

  const ManageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (!stickyElement.current) return;

    const { left, top, width, height } = stickyElement.current.getBoundingClientRect();

    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };

    if (isHovered) {
      //rotate

      rotate(distance);
      //stretch
      const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
      const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
      const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8]);
      scale.x.set(newScaleX);
      scale.y.set(newScaleY);

      mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
      mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
    } else {
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    }
  };

  const manageMouseOver = () => {
    setIsHovered(true);
  };

  const manageMouseLeave = () => {
    setIsHovered(false);
    if (cursorRef.current) {
      animate(cursorRef.current, { scaleX: 1, scaleY: 1 }, { duration: 0.1 });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", ManageMouseMove);
    const currentElement = stickyElement.current;

    if (currentElement) {
      currentElement.addEventListener("mouseover", manageMouseOver);
      currentElement.addEventListener("mouseleave", manageMouseLeave);
    }
    return () => {
      window.removeEventListener("mousemove", ManageMouseMove);
      if (currentElement) {
        currentElement.removeEventListener("mouseover", manageMouseOver);
        currentElement.removeEventListener("mouseleave", manageMouseLeave);
      }
    };
  });

  const template = ({ rotate, scaleX, scaleY }: { rotate: string; scaleX: number; scaleY: number }) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
    <motion.div
      className="cursor"
      ref={cursorRef}
      transformTemplate={template}
      style={{
        left: smoothMouse.x,
        scaleX: scale.x,
        scaleY: scale.y,
        top: smoothMouse.y,
      }}
      animate={{ width: cursorSize, height: cursorSize }}></motion.div>
  );
};

export default Cursor;
