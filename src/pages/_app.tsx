import type { NextComponentType } from "next";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";


import "styles/index.css";

import Head from "next/head";



const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
  props: AppLayoutProps
) => {
  const { Component, pageProps: { session, ...pageProps } } = props;
  return (
    <>
      <Head>
        <title>My page</title>
        {/* @ts-ignore */}
        <meta charSet="UTF-8" />
        <meta name="description" content="Free Web tutorials" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Dadmor" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex flex-col min-h-screen">
    
        <Component {...pageProps} />
       
      </div>
    </>
  );
};

export default App;


