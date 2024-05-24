"use client";
import { useDispatch } from "react-redux";
import { getMovies, searchAction } from "../lib/SearchSlice";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useEffect, useState } from "react";

const Try = () => {
  const dispatch = useDispatch();
  const [typingTimeOut, setTypingTimeOut] = useState<NodeJS.Timeout | null>(null);
  const [search, setSearch] = useState("");
  // const searchToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value.length > 3) {
  //     dispatch(searchAction(e.target.value));
  //   }
  //   console.log(e.target.value);
  // };

  const searchToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputSearch = event.target.value;
    
    if (inputSearch.length > 3) {
      if (typingTimeOut) {
        clearTimeout(typingTimeOut);
      }
      setTypingTimeOut(
        setTimeout(() => {
          setSearch(inputSearch);
          dispatch(searchAction(inputSearch));
        }, 1000)
      );
    }
  };

  return (
    <div className="w-[50%] flex border border-gray-800 rounded-lg px-3 bg-black items-center">
      <SearchRoundedIcon />
      <input type="text" className="w-[100%] h-[100%] border-none outline-none p-2 bg-transparent" placeholder="Search Movie" onChange={searchToggle} />
    </div>
  );
};

export default Try;
