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

//TODO:추후 환경에 맞춰 유동적으로 바뀔수있게 변경 예정
const httpLink = createHttpLink({
  uri: "http://localhost:3003/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-JWT": authTokenVar() || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
        },
      },
    },
  }),
});
