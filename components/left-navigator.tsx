"use client";

import {
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
} from "@/pages/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
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
  selectItem: (item: string) => void;
};

const LeftNavigator = ({ selectItem }: LeftNavigatorProps) => {
  const { loading, data } = useQuery<
    GetCategoriesCountsQuery,
    GetCategoriesCountsQueryVariables
  >(GET_CATEGORIES_COUNTS_QUERY);
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // 컴포넌트가 클라이언트에서 렌더링된 후 hydrated 상태를 true로 설정
  }, []);

  if (!hydrated) {
    // 클라이언트에서 렌더링되기 전에는 빈 상태로 유지하여 서버와 클라이언트의 HTML 불일치를 방지
    return null;
  }

  const handleClick = (categoryTitle: string) => {
    selectItem(categoryTitle);
    router.push(`/${encodeURIComponent(categoryTitle)}`);
  };
  return (
    <nav className="h-full bg-gray-800 text-white p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data?.getCategoriesCounts.categoryCounts?.map((categories) => (
            <li
              key={categories.categoryTitle}
              onClick={() => handleClick(categories.categoryTitle)}
              className="block px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              {categories.categoryTitle} ({categories.count})
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default LeftNavigator;
