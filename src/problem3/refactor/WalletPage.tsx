import React, { useMemo } from 'react';
import {
  formatAmount,
  calculateUsdValue,
  filterBalances,
  compareByBlockchainPriority
} from './utils';
import { BoxProps } from './types';

// Main component
const WalletPage: React.FC<BoxProps> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // Memoized balance processing
  const sortedBalances = useMemo(() => {
    if (!balances) return [];

    const filteredBalances = filterBalances(balances);
    return [...filteredBalances].sort(compareByBlockchainPriority);
  }, [balances]);

  // Memoized row rendering
  const rows = useMemo(() => {
    return sortedBalances.map(balance => {
      const { currency, amount, blockchain } = balance;
      const usdValue = calculateUsdValue(amount, currency, prices);
      const formattedAmount = formatAmount(amount);
      return (
        <WalletRow
          className={classes?.row ?? ''}
          key={`${currency}-${blockchain}`}
          amount={amount}
          usdValue={usdValue} // we should handle the null value here, 
                              // we don't want to return balance 0 to customer while issue occur
          formattedAmount={formattedAmount}
        />
      );
    });
  }, [sortedBalances, prices]);

  if (!balances || !prices) {
    return <div>Loading...</div>;
  }

  // Empty state handling
  if (!balances?.length) {
    return <div>No balances available</div>;
  }

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

export default WalletPage; 