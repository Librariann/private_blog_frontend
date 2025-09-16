import { GetCategoriesQuery, GetCategoriesQueryVariables } from "@/gql/graphql";
import { GET_CATEGORIES } from "@/lib/queries";
import { useQuery } from "@apollo/client";

export async function useGetCategories() {
  const { data } = useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      ssr: false, // SSR 비활성화
    }
  );

  return data;
}
