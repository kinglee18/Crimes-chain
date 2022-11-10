import { ethers, Signer, providers} from "ethers";
import { MissingPeople } from "../dapp/typechain-types";
const missingPeopleABI = require("../dapp/artifacts/contracts/MissingPeople.sol/MissingPeople.json");


export const getAppW3Provider = (provider: any) => {
   return new ethers.providers.Web3Provider(provider);
}


export const getContractInstance = (providerOrSigner: Signer| providers.JsonRpcSigner ) => {
   return new ethers.Contract('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', missingPeopleABI.abi, providerOrSigner) as MissingPeople
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