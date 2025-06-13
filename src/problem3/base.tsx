// ISSUE: Missing blockchain property in interface which is used throughout the code
interface WalletBalance {
  currency: string;
  amount: number;
}

// ISSUE: Should extend WalletBalance to include blockchain property
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// ISSUE: BoxProps is not defined or imported
interface Props extends BoxProps {

}

// ISSUE: Double type annotation (Props) is redundant
// ISSUE: React namespace is not imported
const WalletPage: React.FC<Props> = (props: Props) => {
  // ISSUE: children is destructured but never used
  const { children, ...rest } = props;
  // ISSUE: Missing type definitions for hooks
  const balances = useWalletBalances();
  const prices = usePrices();

  // ISSUE: Using 'any' type is bad practice
  // ISSUE: Function should be memoized with useCallback
  // ISSUE: Magic numbers should be constants
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  // ISSUE: prices in dependency array but not used in computation
  // ISSUE: lhsPriority is undefined
  // ISSUE: Filter logic is inverted (amount <= 0)
  // ISSUE: Missing return 0 case in sort function
  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (lhsPriority > -99) {
        if (balance.amount <= 0) {
          return true;
        }
      }
      return false
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
    });
  }, [balances, prices]);

  // ISSUE: Unnecessary intermediate array
  // ISSUE: toFixed() used without parameters
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })


  // ISSUE: Using sortedBalances instead of formattedBalances
  // ISSUE: Type mismatch: balance is FormattedWalletBalance but sortedBalances is WalletBalance[]
  // ISSUE: No null check for prices[balance.currency]
  // ISSUE: classes is undefined
  // ISSUE: Using index as key is anti-pattern
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  // ISSUE: No empty state handling
  // ISSUE: No error boundary
  // ISSUE: No loading state
  return (
    <div {...rest}>
      {rows}
    </div>
  )
}