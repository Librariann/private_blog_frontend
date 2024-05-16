"use client";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "../styles/globals.css";
import { client } from "@/apollo";
import { ApolloProvider } from "@apollo/client";
import LoginCheck from "../components/login-check";
import Header from "@/components/header";
import { useRouter } from "next/router";
import LeftNavigator from "@/components/left-navigator";
import Footer from "@/components/footer";

export const handlePathes = ["/login", "/create-account"];

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const showHeader = !handlePathes.includes(pathname);
  return (
    <ApolloProvider client={client}>
      <Layout>
        {/* <LoginCheck */}
        {showHeader && <Header />}
        {showHeader && <LeftNavigator />}
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
