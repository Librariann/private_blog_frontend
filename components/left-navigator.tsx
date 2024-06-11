"use client";

import {
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
} from "@/pages/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

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
  return (
    <nav className="h-full bg-gray-800 text-white p-4">
      {!loading && (
        <ul className="space-y-2">
          {data?.getCategoriesCounts.categoryCounts?.map((categories) => (
            <li
              key={categories.categoryTitle}
              onClick={() => selectItem(categories.categoryTitle)}
            >
              <Link
                href={{
                  pathname: `/${encodeURIComponent(categories.categoryTitle)}`,
                }}
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                {categories.categoryTitle} ({categories.count})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default LeftNavigator;
