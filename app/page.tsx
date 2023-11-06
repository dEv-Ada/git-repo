"use client";
import React, { useState, useEffect } from "react";
import { RepoListModel } from "./model/datModel";
import RepoList from "./repoList";

const Home = () => {
  const [allRepo, setAllRepo] = useState<RepoListModel[]>([]);
  const [filterRepo, setFilterRepo] = useState<RepoListModel[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [gotoIndex, setGotoIndex] = useState<number>(10);

  useEffect(() => {
    async function fetchData() {
      const repository = await fetch(
        "https://api.github.com/orgs/nodejs/repos"
      );
      const repoList: RepoListModel[] = await repository.json();
      setAllRepo(repoList);
      const filterData = repoList.slice(currentIndex, gotoIndex);
      setFilterRepo(filterData);
    }
    fetchData();
  }, []);

  const searchRepo = async (searchTerm: string) => {
    if (searchTerm === "") {
      const repository = await fetch(
        "https://api.github.com/orgs/nodejs/repos"
      );
      const repoList: RepoListModel[] = await repository.json();
      setAllRepo(repoList);
      const filterData = repoList.slice(currentIndex, gotoIndex);
      setFilterRepo(filterData);
    } else {
      const repository = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm}`
      );
      const repoLists = await repository.json();
      const repoList: RepoListModel[] = repoLists.items;
      setAllRepo(repoList);
      const filterData = repoList.slice(currentIndex, gotoIndex);
      setFilterRepo(filterData);
    }
  };

  const fecthPrevData = () => {
    setFilterRepo(allRepo.slice(currentIndex - 10, gotoIndex - 10));
    setCurrentIndex(currentIndex - 10);
    setGotoIndex(gotoIndex - 10);
  };

  const fecthNextData = () => {
    setFilterRepo(allRepo.slice(currentIndex + 10, gotoIndex + 10));
    setCurrentIndex(currentIndex + 10);
    setGotoIndex(gotoIndex + 10);
  };

  return (
    <main>
      {filterRepo?.length > 0 ? (
        <RepoList
          filterRepo={filterRepo}
          fecthPrevData={fecthPrevData}
          fecthNextData={fecthNextData}
          start={currentIndex}
          end={gotoIndex}
          total={allRepo.length}
          searchRepo={searchRepo}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute -translate-y-1/2 -translate-x-1/2 top-2/4 left-1/2">
            Loading...
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
