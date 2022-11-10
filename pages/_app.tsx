declare let window: any;
import {useState} from 'react';
import "../styles/globals.css";
import "../styles/personal-data-form.css";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { Web3Context } from "../context/web3Provider";
import { getAppW3Provider, getContractInstance } from "../utils/web3";
import { MissingPeople } from '../dapp/typechain-types';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";


function MyApp({ Component, pageProps }: AppProps) {

  let w3Provider: any;
    if (typeof window !== "undefined") {
      w3Provider = getAppW3Provider(window.ethereum);
   }
   const [peopleContract, setPeopleContract] = useState<MissingPeople>(getContractInstance(w3Provider));


  return (
    <Web3Context.Provider value={{w3Provider, peopleContract, setPeopleContract}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocalizationProvider>
    </Web3Context.Provider>
  );
}

export default MyApp;
