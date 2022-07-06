import { Contract, ethers } from 'ethers';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useWeb3Context } from 'web3-react';
import {
  callContractMethod,
  createContract,
  createSigner,
} from '../../../services/web3';
import Card from '../../Card';

export default function TransferCard(): ReactElement {
  const context = useWeb3Context();
  const recipientInput = useRef<HTMLInputElement>(null);
  const amountInput = useRef<HTMLInputElement>(null);

  let signer: ethers.providers.JsonRpcSigner;
  let contract: Contract;
  useEffect(() => {
    const walletAddress = context.account;
    if (walletAddress) {
      signer = createSigner(walletAddress as string);
      contract = createContract(signer);
    }
  }, [context]);

  async function onSend(): Promise<void> {
    const recepient = recipientInput.current?.value;
    const amount = amountInput.current?.value;

    // * via call contract method
    // callContractMethod(contract, 'approve', [recepient, amount])
    //   .then((res) => console.log('res', res))
    //   .catch((error) => console.error(error));

    // * via signer encoded function call
    // const fn = contract.interface.getFunction('transfer');
    // const data = contract.interface.encodeFunctionData(fn, [recepient, amount]);
    // const tx = await signer.sendTransaction({
    //   value: 0x0,
    //   from: context.account as string,
    //   to: recepient,
    //   data,
    // });
    // console.log('tx', tx);
  }

  return (
    <Card title="Transfer Form">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="text-gray-700" htmlFor="address">
            Recepient Address
          </label>
          <input
            ref={recipientInput}
            id="address"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="text-gray-700" htmlFor="amount">
            Amount
          </label>
          <input
            ref={amountInput}
            id="amount"
            type="number"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        {context.account ? (
          <button
            className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            onClick={onSend}
          >
            Send
          </button>
        ) : (
          <button
            className="cursor-not-allowed px-4 py-2 font-medium tracking-wide text-slate-300 capitalize bg-slate-600 rounded-md"
            disabled
          >
            Connect to send
          </button>
        )}
      </div>
    </Card>
  );
}
