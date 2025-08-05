"use client";
import {
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
} from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategorySkeleton from "./skeleton/category-skeleton";
import { GET_CATEGORIES_COUNTS_QUERY } from "@/lib/queries";

type LeftNavigatorProps = {
  isOpen: boolean;
  onClose: () => void;
};

type childrenProps = {
  id: number;
  categoryTitle: string;
  count: number;
};

const LeftNavigator = ({ isOpen, onClose }: LeftNavigatorProps) => {
  const { loading, data: getCategoryDatas } = useQuery<
    GetCategoriesCountsQuery,
    GetCategoriesCountsQueryVariables
  >(GET_CATEGORIES_COUNTS_QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("/");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const categories =
      getCategoryDatas?.getCategoriesCounts?.categoryCounts || [];
    setCategories(categories);
  }, [getCategoryDatas]);

  useEffect(() => {
    // 클라이언트에서만 router.asPath 사용
    setCurrentPath(router.asPath);
  }, [router.asPath]);

  // Prefetch category pages on hover
  const handlePrefetch = (categoryTitle: string) => {
    router.prefetch(`/${encodeURIComponent(categoryTitle)}`);
  };

  const handleClick = () => {
    onClose(); // 모바일에서 카테고리 선택 시 메뉴 닫기
  };

  const sumAllCategoryCounts = categories.reduce((acc, cur) => {
    return acc + cur.count;
  }, 0);

  // 현재 선택된 카테고리 확인 (SSR safe)
  const currentCategory = currentPath.split("/")[1];
  const isHome = currentPath === "/";

  return (
    <>
      {/* 데스크톱 뷰 */}
      <nav className="hidden xl:block h-full bg-linear-to-b from-gray-800 to-gray-900 text-white p-6 round rounded-xl border-gray-700">
        <div className="mb-8 border-b border-gray-700 pb-4">
          <h2 className="text-xl font-bold">카테고리</h2>
        </div>
        {categories.length === 0 ? (
          <CategorySkeleton />
        ) : (
          <ul className="space-y-3">
            {/* 전체보기 필요없어서 삭제 */}
            {/* <li
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
            </li> */}
            {categories.map((category) => (
              <>
                <li
                  key={category.categoryTitle}
                  className={`hover:bg-gray-700 transition-colors duration-200 ${
                    decodeURIComponent(currentCategory) ===
                    category.categoryTitle
                      ? "bg-gray-700"
                      : ""
                  }`}
                  onMouseEnter={() => handlePrefetch(category.categoryTitle)}
                >
                  <Link
                    href={`/post/${encodeURIComponent(category.categoryTitle)}`}
                    prefetch={true}
                    className="flex items-center justify-between px-4 py-3 rounded-lg w-full"
                  >
                    <span>{category.categoryTitle}</span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                      {category.count}
                    </span>
                  </Link>
                </li>
                <li>
                  {category.children.map((child: childrenProps, i: number) => (
                    <Link
                      key={i}
                      href={`/post/${encodeURIComponent(
                        category.categoryTitle
                      )}/${encodeURIComponent(child.categoryTitle)}`}
                    >
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ㄴ
                        {child.categoryTitle}
                        {child.count}
                      </div>
                    </Link>
                  ))}
                </li>
              </>
            ))}
          </ul>
        )}
      </nav>

      {/* 모바일 뷰 */}
      <div
        className={`xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <nav
          className={`fixed top-0 left-0 h-full w-72 bg-linear-to-b from-gray-800 to-gray-900 text-white p-6 transform transition-transform duration-300 ease-in-out shadow-xl ${
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
          {categories.length === 0 ? (
            <CategorySkeleton />
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
              {categories.map((category) => (
                <li
                  key={category.categoryTitle}
                  className={`hover:bg-gray-700 transition-colors duration-200 ${
                    decodeURIComponent(currentCategory) ===
                    category.categoryTitle
                      ? "bg-gray-700"
                      : ""
                  }`}
                  onMouseEnter={() => handlePrefetch(category.categoryTitle)}
                >
                  <Link
                    href={`/${encodeURIComponent(category.categoryTitle)}`}
                    onClick={handleClick}
                    prefetch={true}
                    className="flex items-center justify-between px-4 py-3 rounded-lg w-full"
                  >
                    <span>{category.categoryTitle}</span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                      {category.count}
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
