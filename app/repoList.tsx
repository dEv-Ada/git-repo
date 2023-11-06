import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons/faCodeFork";
import { faCodePullRequest } from "@fortawesome/free-solid-svg-icons/faCodePullRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SearchBox from "./components/search";
import { RepoListModel } from "./model/datModel";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons/faScaleBalanced";
import PaginationButton from "./components/paginationButton";

const RepoList = ({
  filterRepo,
  fecthPrevData,
  fecthNextData,
  start,
  end,
  total,
  searchRepo,
}: any) => {
  const diffDate = (d1: any) => {
    const a = new Date(d1);
    const b = new Date();
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const sDiff = Math.floor((utc2 - utc1) / 1000);
    const mDiff = sDiff / 60;
    const hDiff = mDiff / 60;
    const dDiff = hDiff / 24;
    if (dDiff !== 0) {
      return dDiff + " days";
    } else if (hDiff !== 0) {
      return hDiff + " hours";
    } else if (mDiff !== 0) {
      return mDiff + " minutes";
    } else {
      return sDiff + " seconds";
    }
  };
  return (
    <>
      <div className="flex flex-col container mx-auto mt-2">
        <h3 className="w-full">
          {" "}
          <FontAwesomeIcon icon={faBookBookmark} className="svg-icons mr-3" />
          Repositories
        </h3>
        <SearchBox searchRepo={searchRepo} />
        <div className="border border-gray-200 w-full">
          {filterRepo?.length > 0 &&
            filterRepo?.map((item: RepoListModel) => (
              <div key={item.id} className="w-full border border-gray-200 p-3">
                <div className="w-full flex flex-wrap mb-2">
                  <div className="w-auto mr-2">{item.name}</div>
                  <div className="w-auto">
                    <span className="label">
                      {item.private ? "Private" : "Public"}
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-wrap mb-2">
                  {item.topics.map((el: string, ind: number) => (
                    <button
                      key={ind}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-0 px-3 mb-3 rounded-full ml-2"
                    >
                      {el}
                    </button>
                  ))}
                </div>
                <div className="w-full flex flex-wrap">
                  {item.language && (
                    <>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="svg-tech-icon mr-2 pt-1"
                      />
                      <div className="w-auto mr-3">{item.language}</div>
                    </>
                  )}
                  {item.license && (
                    <>
                      <FontAwesomeIcon
                        icon={faScaleBalanced}
                        className="svg-icons mr-2 pt-1"
                      />
                      <div className="w-auto mr-3">{item.license.name}</div>
                    </>
                  )}
                  <div className="w-auto mr-3">
                    <FontAwesomeIcon icon={faStar} className="svg-icons mr-2" />
                    <span>{item.stargazers_count}</span>
                  </div>
                  <div className="w-auto mr-3">
                    <FontAwesomeIcon
                      icon={faCodeFork}
                      className="svg-icons mr-2"
                    />
                    <span>{item.forks}</span>
                  </div>
                  <div className="w-auto mr-3">
                    <FontAwesomeIcon
                      icon={faCircleDot}
                      className="svg-icons mr-2"
                    />
                    <span>500 (dummy)</span>
                  </div>
                  <div className="w-auto mr-3">
                    <FontAwesomeIcon
                      icon={faCodePullRequest}
                      className="svg-icons mr-2"
                    />
                    <span>234 (dummy)</span>
                  </div>
                  <div className="w-auto mr-3">
                    Updated {diffDate(item.pushed_at)} ago
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {start + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {end}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {total}
            </span>{" "}
            Entries
          </span>
          <PaginationButton
            start={start}
            end={end}
            total={total}
            prevFunc={fecthPrevData}
            nextFunc={fecthNextData}
          />
        </div>
      </div>
    </>
  );
};

export default RepoList;
