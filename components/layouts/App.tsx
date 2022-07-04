import Head from 'next/head';
import React, { ReactElement, useEffect } from 'react';
import { useWeb3Context } from 'web3-react';
import { disconnectWeb3 } from '../../services/web3';
import Navbar from './Navbar';

export default function App({
  children,
}: {
  children: ReactElement | Array<ReactElement>;
}): ReactElement {
  const context = useWeb3Context();

  useEffect(() => {
    (window as any).ethereum.on(
      'accountsChanged',
      function (accounts: Array<string>) {
        console.log('accountsChanged', accounts);
        if (accounts.length === 0) disconnectWeb3(context);
      },
    );

    (window as any).ethereum.on('networkChanged', function (networkId: number) {
      console.log('networkChanged', networkId);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Web3 Ethers Metamask</title>
        <meta name="description" content="Web3 Ethers Metamask" />
        <link rel="icon" href="/metamask.svg" />
      </Head>

      <Navbar />

      <div className="min-h-[calc(100vh-94px)] bg-gray-50">
        <main className="container mx-auto px-6 sm:px-0 py-5">{children}</main>
      </div>
    </>
  );
}
