declare let window: any;
import { useEffect, useState } from 'react';
import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { Web3Context } from "../context/web3Provider";
import { getAppW3Provider, getConnectedAccounts, getContractInstance } from "../utils/web3";
import { MissingPeople } from '../dapp/typechain-types';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Backdrop } from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';


function MyApp({ Component, pageProps }: AppProps) {

  let [w3Provider, setProvider] = useState<null | Web3Provider>();;
  let [infoMessage, setInfoMessage] = useState<null | string>(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        window.ethereum.on("chainChanged", () => {
          if (window.ethereum.chainId !== '0x13881') {
            setInfoMessage('Please switch to Mumbai network');
          }
          else {
            setProvider(getAppW3Provider(window.ethereum));
            setInfoMessage(null);
          }
        });
        if (window.ethereum.chainId !== '0x13881') {
          setInfoMessage('Please switch to Mumbai network');
        } else {
          setProvider(getAppW3Provider(window.ethereum));
          const account = await getConnectedAccounts();
        }
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (w3Provider) {
      setPeopleContract(getContractInstance(w3Provider));
    }
      
  }, [w3Provider]);
  const [peopleContract, setPeopleContract] = useState<MissingPeople | undefined>();

  useEffect(() => {
    const init = async () => {
      //const account = await getConnectedAccounts();
      //setPeopleContract(getContractInstance(account));
    }
    init();
  }, []);


  return (

    <Web3Context.Provider value={{ w3Provider, peopleContract, setPeopleContract }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Layout>
          {(w3Provider && peopleContract) && <Component {...pageProps} />}
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={infoMessage ? true : false}
          >
            {infoMessage}
          </Backdrop>
        </Layout>
      </LocalizationProvider>
    </Web3Context.Provider>
  );
}

export default MyApp;
