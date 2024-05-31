"use client";

import {
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
} from "@/pages/gql/graphql";
import { gql, useQuery } from "@apollo/client";

export const GET_CATEGORIES_COUNTS_QUERY = gql`
  query getCategoriesCounts {
    getCategoriesCounts {
      ok
      categoryCounts {
        categoryTitle
        count
      }
    }
  }
`;

const LeftNavigator = () => {
  const { loading, error, data } = useQuery<
    GetCategoriesCountsQuery,
    GetCategoriesCountsQueryVariables
  >(GET_CATEGORIES_COUNTS_QUERY);
  return (
    <nav className="h-full bg-gray-800 text-white p-4">
      {!loading && (
        <ul className="space-y-2">
          {data?.getCategoriesCounts.categoryCounts?.map(
            (categories, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  {categories.categoryTitle} ({categories.count})
                </a>
              </li>
            )
          )}
        </ul>
      )}
    </nav>
  );
};

export default LeftNavigator;
