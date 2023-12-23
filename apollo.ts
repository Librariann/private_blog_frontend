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

export const authTokenVar = makeVar("");
export const isLoggedInVar = makeVar(false);

export const makeClient = () => {
  const httpLink = createHttpLink({
    uri: "http://localhost:3000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    console.log(token);
    if (token) {
      authTokenVar(token);
      isLoggedInVar(Boolean(token));
    }
    return {
      headers: {
        ...headers,
        "x-jwt": token || "",
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
};
