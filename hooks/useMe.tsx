import { MeQuery } from "@/pages/gql/graphql";
import { gql, useQuery } from "@apollo/client";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
    }
  }
`;

export const useMe = () => {
  return useQuery<MeQuery>(ME_QUERY);
};
