import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "@/services/axios";
import type { Token } from "@/types/token";
import type { SwapResponse } from "@/types";

// Create mock adapter instance
const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });

// Mock token prices data
const mockTokens: Token[] = [
  {
    currency: "ETH",
    date: new Date().toISOString(),
    price: 2000.0,
  },
  {
    currency: "BTC",
    date: new Date().toISOString(),
    price: 40000.0,
  },
  {
    currency: "USDT",
    date: new Date().toISOString(),
    price: 1.0,
  },
  {
    currency: "USDC",
    date: new Date().toISOString(),
    price: 1.0,
  },
  {
    currency: "SOL",
    date: new Date().toISOString(),
    price: 100.0,
  },
  {
    currency: "AVAX",
    date: new Date().toISOString(),
    price: 35.0,
  },
];

// Mock GET /prices.json endpoint
mock.onGet("/prices.json").reply(200, mockTokens);

// Mock POST /swap endpoint
mock.onPost("/swap").reply((config) => {
  const data = JSON.parse(config.data);

  // Simulate validation
  if (!data.fromCurrency || !data.toCurrency || !data.amount) {
    return [400, { message: "Missing required fields" }];
  }

  // Simulate validation for same currency swap
  if (data.fromCurrency === data.toCurrency) {
    return [400, { message: "Cannot swap the same currency" }];
  }

  // Simulate validation for amount
  if (data.amount <= 0) {
    return [400, { message: "Amount must be greater than 0" }];
  }

  // Simulate successful swap
  return [
    200,
    {
      success: true,
      transactionId: `tx_${Math.random().toString(36).substring(7)}`,
      timestamp: new Date().toISOString(),
      fromAmount: data.amount,
      fee: 1,
      rate: 1,
      toAmount: calculateSwapAmount(
        data.amount,
        data.fromCurrency,
        data.toCurrency,
        mockTokens
      ),
      fromCurrency: data.fromCurrency,
      toCurrency: data.toCurrency,
    } as SwapResponse,
  ];
});

// Helper function to calculate swap amount based on token prices
function calculateSwapAmount(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  tokens: Token[]
): number {
  const fromToken = tokens.find((t) => t.currency === fromCurrency);
  const toToken = tokens.find((t) => t.currency === toCurrency);

  if (!fromToken || !toToken) return 0;

  return (amount * fromToken.price) / toToken.price;
}

export default mock;
