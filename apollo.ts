//TODO: product 배포시 사용 할 예정
import { InMemoryCache, ApolloClient, makeVar } from "@apollo/client";
import { LOCAL_STORAGE_TOKEN } from "./common/constants";
import { useEffect } from "react";
// const httpLink = createHttpLink({
//   uri:
//     process.env.NODE_ENV === "production"
//       ? ""
//       : "http://localhost:3000/graphql",
// });
export let authTokenVar;
if (typeof window !== "undefined") {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  authTokenVar = makeVar(token);
}

export const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
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
