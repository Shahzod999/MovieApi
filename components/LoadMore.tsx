"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { getMovies, incrementPage } from "@/lib/SearchSlice";

function LoadMore() {
  const dispatch = useDispatch<AppDispatch>();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      dispatch(incrementPage());
      dispatch(getMovies());
    }
  }, [inView, dispatch]);

  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image src="./spinner.svg" alt="spinner" width={56} height={56} className="object-contain" />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
