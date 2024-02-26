import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "@/pages/gql/graphql";

export const ME_QUERY = gql`
  query Me {
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
  const { data } = useQuery<MeQuery>(ME_QUERY);

  return {
    data,
  };
};
