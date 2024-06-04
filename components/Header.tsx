"use client";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { motion } from "framer-motion";

function Header() {
  return (
    <header className="bg-header overflow-hidden bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
      <div className="flex-1 flex flex-col gap-10 h-[50vh] ">
        <SearchInput />
        <Link href="/">
          <motion.h1
            initial={{ x: 0 }}
            whileHover={{ x: -20 }}
            transition={{
              type: "spring",
            }}
            className="sm:text-6xl text-5xl text-white lg:max-w-lg font-bold leading-[120%]">
            Plunge Into The <span className="red-gradient">World</span> Of Cinema
          </motion.h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;
