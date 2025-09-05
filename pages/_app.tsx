import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { createApolloClient } from "@/apollo";
import { ApolloProvider } from "@apollo/client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "aos/dist/aos.css";
import "../styles/markdown.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useUserInfoStore } from "@/stores/useUserInfoStore";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient(pageProps.initialApolloState);
  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    if (pageProps.userInfo) {
      setUserInfo(pageProps.userInfo);
    }
  }, [pageProps.userInfo, setUserInfo]);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link rel="icon" href="/favicon-32x32.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/favicon-64x64.png"
        />
        <link rel="apple-touch-icon" sizes="64x64" href="/favicon-64x64.png" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
