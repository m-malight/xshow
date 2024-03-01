import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { searchType } from "@/types";

function Search({ onSearch }: searchType): React.JSX.Element {
  return (
    <div className=" fixed mb-4 ml-3 w-full mt-2">
      <input
        onChange={onSearch}
        placeholder="Search for movies or Tv Series"
        className="bg-slate-950 focus:outline-none w-full px-8 p-4 font-bold text-slate-50"
      />
      <button className="absolute top-4 left-0 translate-y-1 cursor-pointer text-slate-50 ">
        <AiOutlineSearch />
      </button>
    </div>
  );
}

export default Search;
