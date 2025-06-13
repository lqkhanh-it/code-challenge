import { ReactNode } from 'react';

export type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

export interface BoxProps {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}