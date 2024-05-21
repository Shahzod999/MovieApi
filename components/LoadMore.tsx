"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import {  fetchMovie } from "@/app/action";
import AnimeCard from "./AnimeCard";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

let page = 2;
let category = 'batman'
export type AnimeCard = JSX.Element;

function LoadMore() {
  const count = useSelector((state: RootState) => state.search.value);
  category = count
  
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    if (inView) {
      fetchMovie(page, category).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">{data}</section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image src="./spinner.svg" alt="spinner" width={56} height={56} className="object-contain" />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
