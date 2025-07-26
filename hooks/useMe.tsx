import { gql, useQuery } from "@apollo/client";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      createdAt
      updatedAt
      posts {
        title
      }
    }
  }
`;

export const useMe = () => {
  const { data, error } = useQuery(ME_QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  if (error?.message === "Token has expired") {
    return { data: "Token has expired" };
  }
  return {
    data,
  };
};
