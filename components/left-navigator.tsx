"use client";
import {
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
} from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

export const GET_CATEGORIES_COUNTS_QUERY = gql`
  query getCategoriesCounts {
    getCategoriesCounts {
      ok
      categoryCounts {
        id
        categoryTitle
        count
      }
    }
  }
`;

type LeftNavigatorProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LeftNavigator = ({ isOpen, onClose }: LeftNavigatorProps) => {
  const { loading, data } = useQuery<
    GetCategoriesCountsQuery,
    GetCategoriesCountsQueryVariables
  >(GET_CATEGORIES_COUNTS_QUERY);
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  const handleClick = (categoryTitle: string) => {
    onClose(); // 모바일에서 카테고리 선택 시 메뉴 닫기
  };

  const sumAllCategoryCounts = data?.getCategoriesCounts.categoryCounts?.reduce(
    (acc, cur) => {
      return acc + cur.count;
    },
    0
  );

  // 현재 선택된 카테고리 확인
  const currentCategory = router.asPath.split("/")[1]; // URL에서 첫번째 경로 부분만 가져오기
  const isHome = router.asPath === "/";

  return (
    <>
      {/* 데스크톱 뷰 */}
      <nav className="hidden md:block h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6">
        <div className="mb-8 border-b border-gray-700 pb-4">
          <h2 className="text-xl font-bold">카테고리</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <ul className="space-y-3">
            <li
              className={`hover:bg-gray-600 transition-colors duration-200 ${
                isHome ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <Link 
                href="/" 
                className="flex items-center justify-between px-4 py-3 rounded-lg w-full"
              >
                <span className="font-medium">전체 보기</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {sumAllCategoryCounts}
                </span>
              </Link>
            </li>
            {data?.getCategoriesCounts.categoryCounts?.map((categories) => (
              <li
                key={categories.categoryTitle}
                className={`hover:bg-gray-700 transition-colors duration-200 ${
                  decodeURIComponent(currentCategory) ===
                  categories.categoryTitle
                    ? "bg-gray-700"
                    : ""
                }`}
              >
                <Link
                  href={`/${encodeURIComponent(categories.categoryTitle)}`}
                  className="flex items-center justify-between px-4 py-3 rounded-lg w-full"
                >
                  <span>{categories.categoryTitle}</span>
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    {categories.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* 모바일 뷰 */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <nav
          className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 transform transition-transform duration-300 ease-in-out shadow-xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
            <h2 className="text-xl font-bold">카테고리</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <ul className="space-y-3">
              <li
                className={`hover:bg-gray-600 transition-colors duration-200 ${
                  isHome ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 rounded-lg w-full"
                >
                  <span className="font-medium">전체 보기</span>
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    {sumAllCategoryCounts}
                  </span>
                </Link>
              </li>
              {data?.getCategoriesCounts.categoryCounts?.map((categories) => (
                <li
                  key={categories.categoryTitle}
                  className={`hover:bg-gray-700 transition-colors duration-200 ${
                    decodeURIComponent(currentCategory) ===
                    categories.categoryTitle
                      ? "bg-gray-700"
                      : ""
                  }`}
                >
                  <Link
                    href={`/${encodeURIComponent(categories.categoryTitle)}`}
                    onClick={() => handleClick(categories.categoryTitle)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg w-full"
                  >
                    <span>{categories.categoryTitle}</span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                      {categories.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default LeftNavigator;
