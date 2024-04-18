"use client";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "../styles/globals.css";
import { client } from "@/apollo";
import { ApolloProvider } from "@apollo/client";
import LoginCheck from "../components/login-check";
import Header from "@/components/header";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const navigate = useRouter();
  return (
    <ApolloProvider client={client}>
      <Layout>
        {/* <LoginCheck */}
        <Header />
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
