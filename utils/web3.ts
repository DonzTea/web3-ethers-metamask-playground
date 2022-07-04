import { ethers } from 'ethers';

export function formatBalance(
  balance: ethers.BigNumberish,
  decimal: ethers.BigNumberish = 18,
): string {
  let formattedBalance = ethers.utils.formatUnits(balance, decimal);
  const [number, decimals] = formattedBalance.split('.');
  if (decimals && +decimals === 0) {
    if (number && +number === 0) {
      formattedBalance = '0';
    } else {
      formattedBalance = number;
    }
  }
  return formattedBalance;
}
