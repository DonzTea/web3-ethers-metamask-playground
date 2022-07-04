import Image from 'next/image';
import React, { ReactElement } from 'react';
import { useWeb3Context } from 'web3-react';
import { Web3Context } from 'web3-react/dist/context';
import { connectWeb3, disconnectWeb3 } from '../../services/web3';

export default function Navbar(): ReactElement {
  const context = useWeb3Context();

  const buttonClass = context.active
    ? 'flex items-center gap-3 px-4 py-2 h-[62px] font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80'
    : 'flex items-center gap-3 px-4 py-2 h-[62px] font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80';

  const buttonText = context.active ? 'Disconnect' : 'Connect';

  function buttonClickHandler(context: Web3Context) {
    if (context.active) {
      disconnectWeb3(context);
    } else {
      connectWeb3(context);
    }
  }

  return (
    <nav className="drop-shadow bg-zinc-50">
      <div className="container px-6 sm:px-0 py-4 mx-auto flex justify-between items-center gap-3">
        <div className="flex items-center justify-between">
          <div>
            <a
              className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform lg:text-3xl hover:text-gray-700"
              href="#"
            >
              Web3 Ethers Metamask
            </a>
          </div>
        </div>

        <div className="items-center md:flex">
          <button
            className={buttonClass}
            onClick={() => buttonClickHandler(context)}
          >
            <div className="flex-shrink-0">
              <Image src={'/metamask.svg'} width={40} height={40} />
            </div>
            <div>{buttonText}</div>
          </button>
        </div>
      </div>
    </nav>
  );
}
