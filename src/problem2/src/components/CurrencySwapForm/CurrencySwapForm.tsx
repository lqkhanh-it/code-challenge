import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSwapStore } from '@store/useSwapStore';
import { useFetchPrices } from '@hooks/useFetchPrices';
import { convertCurrency } from '@utils/convert';
import { currencyApi } from '@services/currencyApi';
import TokenSelect from '@components/TokenSelect/TokenSelect';
import AmountInput from '@components/AmountInput/AmountInput';
import SwapButton from '@components/SwapButton/SwapButton';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { useAppToast } from '@hooks/useAppToast';

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
      await currencyApi.executeSwap({
        fromCurrency,
        toCurrency,
        amount: parseFloat(data.fromAmount),
      });
      toast.success(`Successfully swapped ${data.fromAmount} ${fromCurrency} to ${toAmount} ${toCurrency}`);
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
      {/* Rate Display */}
      {rate && (
        <div className="mb-6 p-4 pt-0 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Exchange Rate</div>
          <div className="text-lg font-semibold">
            1 {fromCurrency} = {rate} {toCurrency}
          </div>
        </div>
      )}

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

      {/* Swap Button */}
      <div className="py-4">
        <SwapButton onClick={handleSwapCurrencies} />
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