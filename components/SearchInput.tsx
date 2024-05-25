"use client";
import { useDispatch } from "react-redux";
import { searchAction } from "../lib/SearchSlice";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Try = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [typingTimeOut, setTypingTimeOut] = useState<NodeJS.Timeout | null>(null);

  const searchToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputSearch = event.target.value;

    if (inputSearch.length > 3) {
      if (typingTimeOut) {
        clearTimeout(typingTimeOut);
      }
      setTypingTimeOut(
        setTimeout(() => {
          dispatch(searchAction(inputSearch));
          router.push("/");
          event.target.value = "";
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
