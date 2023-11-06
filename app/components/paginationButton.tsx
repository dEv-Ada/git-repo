"use client";
import React from "react";

const PaginationButton = ({ start, end, total, prevFunc, nextFunc }: any) => {
  return (
    <div className="inline-flex mt-2 xs:mt-0 mb-4">
      <button
        disabled={start === 0}
        onClick={prevFunc}
        className="flex items-center justify-center mr-2 px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded "
      >
        Prev
      </button>
      <button
        disabled={end === total || end > total}
        onClick={nextFunc}
        className="flex items-center justify-center ml-2 px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded "
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
