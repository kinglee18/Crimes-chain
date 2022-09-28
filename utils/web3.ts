import { ethers } from "ethers";


export const getAppW3Provider = (provider: any) => {
   return new ethers.providers.Web3Provider(provider);
}