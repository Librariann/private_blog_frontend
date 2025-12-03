import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
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
import "../styles/globals.css";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { GlobalLoading } from "@/components/loading/global-loading";
import { useRouter } from "next/router";
import GlobalLoading2 from "@/components/loading/global-loading2";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient(pageProps.initialApolloState);
  const { setUserInfo } = useUserInfoStore();
  const { globalLoading, setGlobalLoading } = useLoadingStore();
  const router = useRouter();

  useEffect(() => {
    if (pageProps.userInfo) {
      setUserInfo(pageProps.userInfo);
    }
  }, [pageProps.userInfo, setUserInfo]);

  useEffect(() => {
    const handleStart = () => setGlobalLoading(true);
    const handleComplete = () => setGlobalLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, setGlobalLoading]);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta
          name="google-site-verification"
          content="Lur52L9fwqDX7fwgKdI3KDi0kVxdh79f1HVKoDEs-Oo"
        />
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
      {globalLoading && <GlobalLoading2 />}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
