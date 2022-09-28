declare let window: any;
import {useEffect} from 'react';
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { Web3Context } from "../context/web3Provider";
import { getAppW3Provider } from "../utils/web3";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }: AppProps) {
  let provider;
    if (typeof window !== "undefined") {
      provider = getAppW3Provider(window.ethereum);
   }


  return (
    <Web3Context.Provider value={{w3Provider: provider}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Context.Provider>
  );
}

export default MyApp;
