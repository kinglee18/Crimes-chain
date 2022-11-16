import { ethers, Signer, providers, BigNumber} from "ethers";
import moment from "moment";
import { MissingPeople } from "../dapp/typechain-types";
const missingPeopleABI = require("../dapp/artifacts/contracts/MissingPeople.sol/MissingPeople.json");


export const getAppW3Provider = (provider: any) => {
   return new ethers.providers.Web3Provider(provider);
}


export const getContractInstance = (providerOrSigner: Signer| providers.JsonRpcSigner ) => {
  let t;
if (providerOrSigner){
  t = providerOrSigner.getSigner();
}
   return new ethers.Contract('0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6', missingPeopleABI.abi, t || providerOrSigner) as MissingPeople
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
