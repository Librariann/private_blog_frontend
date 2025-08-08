import { gql, useQuery } from "@apollo/client";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      nickname
      profileImage
      introduce
      location
      website
      role
      createdAt
      updatedAt
      posts {
        title
        createdAt
        hits
        comments {
          id
        }
      }
    }
  }
`;

export type MeType = {
  me: {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    profileImage: string;
    nickname: string;
    introduce: string;
    location: string;
    website: string;
    role: string;
    posts: {
      title: string;
      createdAt: string;
      hits: number;
      comments: {
        id: string;
      }[];
    }[];
  };
  error?: string;
};

export const useMe = () => {
  const { data, error } = useQuery<MeType>(ME_QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  if (error?.message === "Token has expired") {
    return { data: undefined, error: error?.message };
  }
  return {
    data,
  };
};
