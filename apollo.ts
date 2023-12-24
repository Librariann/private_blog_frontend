import {
  InMemoryCache,
  ApolloClient,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_TOKEN } from "./common/constants";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";

export const makeClient = () => {
  const httpLink = createHttpLink({
    uri: "http://localhost:3000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "x-jwt": localStorage.getItem(LOCAL_STORAGE_TOKEN) || "",
      },
    };
  });

  return new NextSSRApolloClient({
    link: authLink.concat(httpLink),
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            isLoggedIn: {
              read() {
                return localStorage.getItem(LOCAL_STORAGE_TOKEN) ? true : false;
              },
            },
            token: {
              read() {
                return localStorage.getItem(LOCAL_STORAGE_TOKEN);
              },
            },
          },
        },
      },
    }),
  });
};
