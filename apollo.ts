import {
  InMemoryCache,
  ApolloClient,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_TOKEN } from "./common/constants";

export const isBrowser = typeof window !== "undefined";
const token = isBrowser ? localStorage.getItem(LOCAL_STORAGE_TOKEN) : null;
console.log(token);
export const authTokenVar = makeVar(token);
export const isLoggedInVar = makeVar(Boolean(token));

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
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
