import React, { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useWeb3Context } from 'web3-react';
import {
  getBalance,
  getGasPrice,
  createSigner,
  getTransactionCount,
  createContract,
  callContractMethod,
} from '../../../services/web3';
import { formatBalance } from '../../../utils/web3';
import Card from '../../Card';

export default function DataCard(): ReactElement {
  const context = useWeb3Context();

  const [userBalance, setUserBalance] = useState<string>();
  const [gasPrice, setGasPrice] = useState<string>();
  const [trxCount, setTrxCount] = useState<string>();

  const [name, setName] = useState<string>();
  const [symbol, setSymbol] = useState<string>();
  const [decimal, setDecimal] = useState<string>();
  const [totalSupply, setTotalSupply] = useState<string>();
  const [maxSupply, setMaxSupply] = useState<string>();

  useEffect(() => {
    const walletAddress = context.account;
    if (walletAddress) {
      const signer = createSigner(walletAddress as string);
      getBalance(signer)
        .then((_balance) => setUserBalance(_balance))
        .catch((error) => console.error(error));
      getGasPrice(signer)
        .then((_gasPrice) => setGasPrice(_gasPrice))
        .catch((error) => console.error(error));
      getTransactionCount(signer)
        .then((_trxCount) => setTrxCount(_trxCount.toString()))
        .catch((error) => console.error(error));

      const contract = createContract(signer);
      callContractMethod(contract, 'name')
        .then((_name) => setName(_name))
        .catch((error) => console.error(error));
      callContractMethod(contract, 'symbol')
        .then((_symbol) => setSymbol(_symbol))
        .catch((error) => console.error(error));
      callContractMethod(contract, 'decimals')
        .then((_decimal) => {
          setDecimal(_decimal);
          callContractMethod(contract, 'totalSupply')
            .then((_totalSupply) =>
              setTotalSupply(formatBalance(_totalSupply, decimal)),
            )
            .catch((error) => console.error(error));
          callContractMethod(contract, 'maxSupply')
            .then((_maxSupply) =>
              setMaxSupply(formatBalance(_maxSupply, decimal)),
            )
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    } else {
      setUserBalance(undefined);
      setGasPrice(undefined);
      setTrxCount(undefined);

      setName(undefined);
      setSymbol(undefined);
      setDecimal(undefined);
      setTotalSupply(undefined);
      setMaxSupply(undefined);
    }
  }, [context]);

  return (
    <Card title="Web3 Data">
      <h1 className="overflow-hidden text-ellipsis">
        Account: {context.account || '-'}
      </h1>
      <h1 className="overflow-hidden text-ellipsis">
        Network ID: {context.networkId || '-'}
      </h1>
      <h1 className="overflow-hidden text-ellipsis">
        Account Balance: {userBalance || '-'}
      </h1>
      <h1 className="overflow-hidden text-ellipsis">
        Gas Price: {gasPrice || '-'}
      </h1>
      <h1 className="overflow-hidden text-ellipsis">
        Transaction count: {trxCount || '-'}
      </h1>
      <br />
      <h1 className="overflow-hidden text-ellipsis">Name: {name || '-'}</h1>
      <h1 className="overflow-hidden text-ellipsis">Symbol: {symbol || '-'}</h1>
      <h1 className="overflow-hidden text-ellipsis">
        Decimal: {decimal || '-'}
      </h1>
      <h1 className="overflow-hidden text-ellipsis">
        Total Supply: {totalSupply || '-'}
      </h1>
      <h1 className="overflow-hidden text-ellipsis">
        Max Supply: {maxSupply || '-'}
      </h1>
    </Card>
  );
}
