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
  const { data, error } = useQuery(ME_QUERY);
  if (error?.message === "Token has expired") {
    console.log(error.message);
  }
  return {
    data,
  };
};
