import { ethers } from "ethers";
import React, { Dispatch } from "react";
import { MissingPeople } from "../dapp/typechain-types";
import { Web3Provider } from '@ethersproject/providers';

interface AppContextInterface {
    w3Provider:  ethers.providers.Web3Provider | ethers.Signer|Web3Provider| null| undefined;
    peopleContract: MissingPeople | undefined,
    setPeopleContract: Dispatch<MissingPeople>
  }

export const Web3Context = React.createContext<AppContextInterface | null>(null);