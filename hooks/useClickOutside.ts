"use client";
import { useEffect } from "react";

interface ClickRef {
  current: HTMLElement | null
}

export const useClickOutSide = (ref: ClickRef, callback: ()=>void) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};
