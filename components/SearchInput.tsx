"use client";
import { useSelector, useDispatch } from "react-redux";
import { searchAction } from "../lib/SearchSlice";
import { RootState } from "../lib/store";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";


const Try = () => {
  const dispatch = useDispatch();

  const searchToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      dispatch(searchAction(e.target.value));
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
