"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBox = ({ searchRepo }: any) => {
  const [searchValue, setSearchValue] = useState("");
  const debounce = (func: any) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(null, args);
      }, 300);
    };
  };

  const handleSearch = useCallback((val: string) => {
    searchRepo(val);
  }, []);

  const debounceSearch = useCallback(debounce(handleSearch), [handleSearch]);
  const handleInput = (val: string) => {
    setSearchValue(val);
    debounceSearch(val);
  };
  return (
    <div className="-mx-3 mb-0 relative w-full">
      <div className="w-1/2 px-3">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="svg-icons absolute pt-2 mr-5 ml-2"
        />
        <input
          className="appearance-none block w-full border border-gray-200 rounded py-1 px-8 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-password"
          type="search"
          placeholder="Find a repository..."
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBox;
