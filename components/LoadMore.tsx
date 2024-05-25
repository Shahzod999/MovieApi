"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { getMovies, pageCounter, selectedError } from "@/lib/SearchSlice";

function LoadMore() {
  const error = useSelector(selectedError);
  const dispatch = useDispatch<AppDispatch>();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      dispatch(getMovies()).then(() => {
        dispatch(pageCounter());
      });
    }
  }, [inView, dispatch]);

  if (error) {
    return <div>Sorry but there is no such film</div>;
  }

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
