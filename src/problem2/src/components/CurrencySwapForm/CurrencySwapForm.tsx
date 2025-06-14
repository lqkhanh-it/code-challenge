import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSwapStore } from '@/store/useSwapStore';
import { useFetchPrices } from '@/hooks/useFetchPrices';
import { convertCurrency } from '@/utils/convert';
import { currencyApi } from '@/services/currencyApi';
import TokenSelect from '@/components/TokenSelect/TokenSelect';
import AmountInput from '@/components/AmountInput/AmountInput';
import SwapButton from '@/components/SwapButton/SwapButton';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { useAppToast } from '@/hooks/useAppToast';

interface FormData {
  fromAmount: string;
}

const CurrencySwapForm = () => {
  const {
    tokens,
    fromCurrency,
    toCurrency,
    toAmount,
    isLoading,
    error,
    setFromCurrency,
    setToCurrency,
    setToAmount,
    setLoading,
    setError,
    swapCurrencies,
  } = useSwapStore();

  const { handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: { fromAmount: '' },
  });

  const toast = useAppToast();

  useFetchPrices();

  const watchedAmount = watch('fromAmount');

  // Calculate the rate
  const getRate = () => {
    if (!fromCurrency || !toCurrency) return null;
    
    // If we have amounts, use them for calculation
    if (watchedAmount && toAmount) {
      const fromValue = parseFloat(watchedAmount);
      const toValue = parseFloat(toAmount);
      if (isNaN(fromValue) || isNaN(toValue) || fromValue === 0) return null;
      return (toValue / fromValue).toFixed(6);
    }
    
    // If no amounts, calculate rate using base amount of 1
    const baseAmount = "1";
    const converted = convertCurrency(baseAmount, fromCurrency, toCurrency, tokens);
    if (!converted) return null;
    return converted;
  };

  useEffect(() => {
    if (fromCurrency && toCurrency && watchedAmount) {
      const converted = convertCurrency(watchedAmount, fromCurrency, toCurrency, tokens);
      setToAmount(converted);
    } else {
      setToAmount('');
    }
  }, [watchedAmount, fromCurrency, toCurrency, tokens, setToAmount]);

  const onSubmit = async (data: FormData) => {
    if (fromCurrency === toCurrency) {
      const errorMessage = 'Cannot swap the same currency';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await currencyApi.executeSwap({
        fromCurrency,
        toCurrency,
        amount: parseFloat(data.fromAmount),
      });

      toast.success(
        `Successfully swapped ${response.fromAmount} ${fromCurrency} to ${response.toAmount.toFixed(6)} ${toCurrency}\nTransaction ID: ${response.transactionId}`
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to execute swap';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    swapCurrencies();
    toast.info('Currencies swapped');
  };

  const rate = getRate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 w-full max-w-4xl mx-auto p-4 sm:p-8">
      {/* FROM */}
      <div className="flex flex-col sm:flex-row items-end gap-4">
        <TokenSelect
          tokens={tokens}
          value={fromCurrency}
          onChange={(val) => setFromCurrency(val)}
          label="FROM"
        />
        <AmountInput
          value={watchedAmount}
          onChange={(val) => {
            setValue('fromAmount', val);
            if (!val) {
              setToAmount('');
            }
          }}
          placeholder="0.00"
          readOnly={false}
        />
      </div>

      {/* Exchange Rate & Swap Button Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="flex items-center min-h-[44px] bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-400 font-medium shadow-sm flex-1">
          {rate ? (
            <>
              <span className="mr-2 text-gray-500">Exchange Rate:</span>
              <span className="font-semibold text-gray-900 dark:text-white">1 {fromCurrency} = {rate} {toCurrency}</span>
            </>
          ) : null}
        </div>
        <div className="w-14 flex justify-center sm:justify-end">
          <SwapButton onClick={handleSwapCurrencies} />
        </div>
      </div>

      {/* TO */}
      <div className="flex flex-col sm:flex-row items-end gap-4">
        <TokenSelect
          tokens={tokens}
          value={toCurrency}
          onChange={(val) => setToCurrency(val)}
          label="TO"
        />
        <AmountInput
          value={toAmount}
          onChange={() => { }}
          placeholder="0.00"
          readOnly={true}
        />
      </div>

      {/* Error Message */}
      <ErrorMessage error={error} />

      {/* Submit Button */}
      <SubmitButton
        disabled={isLoading || !fromCurrency || !toCurrency || !watchedAmount}
        isLoading={isLoading}
      />
    </form>
  );
};

export default CurrencySwapForm;