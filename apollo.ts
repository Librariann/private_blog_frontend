//TODO: product 배포시 사용 할 예정
import { InMemoryCache, ApolloClient, makeVar } from "@apollo/client";
// const httpLink = createHttpLink({
//   uri:
//     process.env.NODE_ENV === "production"
//       ? ""
//       : "http://localhost:3000/graphql",
// });

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
export const authTokenVar = makeVar(token);

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
