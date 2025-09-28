"use client";

import {
  InMemoryCache,
  ApolloClient,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_TOKEN } from "./common/constants";

// 클라이언트에서만 사용할 수 있는 localStorage 접근
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN);
  }
  return null;
};
export const authTokenVar = makeVar<string | null>(null);
export const isLoggedInVar = makeVar<boolean>(Boolean(false));

if (typeof window !== "undefined") {
  const token = getToken();
  authTokenVar(token);
  isLoggedInVar(Boolean(token));
}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-JWT": authTokenVar() || "",
    },
  };
});

export function createApolloClient(initialState = null) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
      },
      query: {
        errorPolicy: "all",
      },
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            isLoggedIn: {
              read() {
                return isLoggedInVar();
              },
            },
            token: {
              read() {
                return authTokenVar();
              },
            },
            getPostList: {
              merge: false, // 항상 새로운 데이터로 교체
            },
            getPostListByCategoryId: {
              merge: false, // 항상 새로운 데이터로 교체
            },
          },
        },
      },
    }).restore(initialState || {}),
  });
}
export const client = createApolloClient();
