"use client";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
function Header() {
  return (
    <header className="bg-header bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
      <div className="flex-1 flex flex-col gap-10 h-[50vh] ">
        <SearchInput />
        <Link href="/">
          <h1 className="sm:text-6xl text-5xl text-white lg:max-w-lg font-bold leading-[120%]">
            Plunge Into The <span className="red-gradient">World</span> Of Cinema
          </h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;
