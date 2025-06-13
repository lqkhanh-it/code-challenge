import { Blockchain, WalletBalance } from "./types";
import { BLOCKCHAIN_PRIORITIES } from "./constants";

export const getPriority = (blockchain: Blockchain): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
};

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const calculateUsdValue = (
  amount: number,
  currency: string,
  prices: Record<string, number> | null
): number | null => {
  try {
    if (!prices) {
      throw new Error("Prices data is not available");
    }

    const price = prices[currency];
    if (price === undefined) {
      throw new Error(`Price not found for currency: ${currency}`);
    }

    if (isNaN(price) || !isFinite(price)) {
      throw new Error(`Invalid price for currency: ${currency}`);
    }

    return price * amount;
  } catch (error) {
    console.error("[Error][PriceError]", error?.message);
    return null;
  }
};

// Add this function I think we should remove the amount > 0 check
// because we want to show all balances, even if they are zero
export const filterBalances = (balances: WalletBalance[]): WalletBalance[] => {
  return balances.filter(
    (balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0
  );
};

export const compareByBlockchainPriority = (
  a: WalletBalance,
  b: WalletBalance
): number => {
  return getPriority(b.blockchain) - getPriority(a.blockchain);
};
