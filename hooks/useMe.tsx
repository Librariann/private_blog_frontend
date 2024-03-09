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
  const { data } = useQuery(ME_QUERY);

  return {
    data,
  };
};
