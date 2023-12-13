import type { AppProps } from "next/app";
import Layout from "../components/layout";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import "../styles/globals.css";

//TODO: product 배포시 사용 할 예정
// const httpLink = createHttpLink({
//   uri:
//     process.env.NODE_ENV === "production"
//       ? ""
//       : "http://localhost:3000/graphql",
// });

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
