import { ethers, Signer, providers, BigNumber} from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import { MissingPeople } from "../dapp/typechain-types";
const missingPeopleABI = require("../dapp/artifacts/contracts/MissingPeople.sol/MissingPeople.json");


export const getAppW3Provider = (provider: any) => {
   return new ethers.providers.Web3Provider(provider);
}


export const getContractInstance = (providerOrSigner: Signer| Web3Provider ) => {
  let t;
  
  if (providerOrSigner){
    t = providerOrSigner.getSigner();
  } 
   return new ethers.Contract('0xefa609F77104AA8e4d144396B580Ce07a55f1Dc9', missingPeopleABI.abi, t || providerOrSigner) as MissingPeople
 };

export const getConnectedAccounts = async () => {
   return await ethereum.request({method: 'eth_accounts'});
 };

export const connectWallet = async (
   w3Provider: ethers.providers.Web3Provider,
   openSnackBar: React.Dispatch<React.SetStateAction<boolean>>
 ) => {
   try {
     await w3Provider.send("eth_requestAccounts", []);
     return w3Provider.getSigner();
   }
   catch (err) {
     openSnackBar(true);
   }
 };
