import { ethers } from "ethers";
import React from "react";

interface AppContextInterface {
    w3Provider:  ethers.providers.Web3Provider | undefined;
  }

export const Web3Context = React.createContext<AppContextInterface | null>(null);