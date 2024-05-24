"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { getMovies } from "@/lib/SearchSlice";

let page = 1;
function LoadMore() {
  const dispatch = useDispatch<AppDispatch>();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      dispatch(getMovies({ page })).then(() => {
        page++;
      });
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
