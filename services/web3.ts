import { ethers } from 'ethers';
import { Connectors } from 'web3-react';
import { Web3Context } from 'web3-react/dist/context';
import { formatBalance } from '../utils/web3';
import ABI from '../constants/abi.json';

const { InjectedConnector } = Connectors;
const supportedNetworks = [
  1284, // GLMR chainId
];
const MetaMask = new InjectedConnector({ supportedNetworks });
export const connectors = { MetaMask };

// * Connection
export async function connectWeb3(context: Web3Context): Promise<void> {
  return context.setConnector('MetaMask', { suppressAndThrowErrors: true });
}

export function disconnectWeb3(context: Web3Context): void {
  return context.unsetConnector();
}

// * Signer
export function createSigner(
  walletAddress: string,
): ethers.providers.JsonRpcSigner {
  const jsonRpcProvider = new ethers.providers.StaticJsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL as string,
  );
  const signer = jsonRpcProvider.getSigner(walletAddress);
  return signer;
}

export function getBalance(
  signer: ethers.providers.JsonRpcSigner,
): Promise<string> {
  return signer.getBalance().then((balance) => formatBalance(balance));
}

export function getGasPrice(
  signer: ethers.providers.JsonRpcSigner,
): Promise<string> {
  return signer.getGasPrice().then((balance) => formatBalance(balance));
}

export function getTransactionCount(
  signer: ethers.providers.JsonRpcSigner,
): Promise<number> {
  return signer.getTransactionCount();
}

// * Contract
export function createContract(signer: ethers.providers.JsonRpcSigner) {
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
    ABI,
    signer,
  );
  return contract;
}

export function callContractMethod(
  contract: ethers.Contract,
  methodName: string,
  payload: Array<any> = [],
): Promise<any> {
  return contract?.[methodName](...payload);
}
