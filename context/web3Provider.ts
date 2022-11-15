import { ethers } from "ethers";
import React, { Dispatch } from "react";
import { MissingPeople } from "../dapp/typechain-types";

interface AppContextInterface {
    w3Provider:  ethers.providers.Web3Provider | ethers.Signer;
    peopleContract: MissingPeople | undefined,
    setPeopleContract: Dispatch<MissingPeople>
  }

export const Web3Context = React.createContext<AppContextInterface | null>(null);