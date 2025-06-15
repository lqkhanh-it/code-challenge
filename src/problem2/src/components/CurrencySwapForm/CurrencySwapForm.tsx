import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSwapStore } from '@/store/useSwapStore';
import { useFetchPrices } from '@/hooks/useFetchPrices';
import { convertCurrency } from '@/utils/convert';
import { currencyApi } from '@/services/currencyApi';
import TokenSelect from '@/components/TokenSelect/TokenSelect';
import AmountInput from '@/components/AmountInput/AmountInput';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { useAppToast } from '@/hooks/useAppToast';
import { Flex } from "@radix-ui/themes";
import type { FormData } from '@/types';
import Addition from '../Addition/Addition';

const CurrencySwapForm = () => {
  const { tokens, isLoading, error, setLoading, setError } = useSwapStore();
  const methods = useForm<FormData>({
    defaultValues: {
      fromAmount: '',
      fromCurrency: '',
      toCurrency: '',
      toAmount: ''
    },
  });
  const { handleSubmit, watch, setValue, register } = methods

  const toast = useAppToast();
  useFetchPrices();

  const watchedAmount = watch('fromAmount');
  const watchedFromCurrency = watch('fromCurrency');
  const watchedToCurrency = watch('toCurrency');

  useEffect(() => {
    if (watchedFromCurrency && watchedToCurrency && watchedAmount) {
      const converted = convertCurrency(watchedAmount, watchedFromCurrency, watchedToCurrency, tokens);
      setValue('toAmount', converted);
    } else {
      setValue('toAmount', '');
    }
  }, [watchedAmount, watchedFromCurrency, watchedToCurrency, tokens, setValue]);

  const onSubmit = async (data: FormData) => {
    if (data.fromCurrency === data.toCurrency) {
      const errorMessage = 'Cannot swap the same currency';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await currencyApi.executeSwap({
        fromCurrency: data.fromCurrency,
        toCurrency: data.toCurrency,
        amount: parseFloat(data.fromAmount),
      });

      toast.success(
        `Successfully swapped ${response.fromAmount} ${data.fromCurrency} to ${response.toAmount.toFixed(6)} ${data.toCurrency}\nTransaction ID: ${response.transactionId}`
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to execute swap';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl mx-auto p-4 sm:p-8">
        <Flex direction="column" gap="1">
          <Flex direction={{ initial: "column", sm: "row" }} align="end" gap="4">
            <TokenSelect
              value={watchedFromCurrency}
              label="From"
              onChange={(value) => setValue('fromCurrency', value)}
            />
            <AmountInput
              name="fromAmount"
              label="Amount"
              placeholder="0.00"
              register={register}
            />
          </Flex>

          <Addition />

          <Flex direction={{ initial: "column", sm: "row" }} align="end" gap="4">
            <TokenSelect
              label="To"
              value={watchedToCurrency}
              onChange={(value) => setValue('toCurrency', value)}
            />
            <AmountInput
              name="toAmount"
              label="Amount"
              placeholder="0.00"
              register={register}
            />
          </Flex>

          <Flex direction="column" gap="1" className="pt-4">
            <ErrorMessage message={error || ''} />

            <SubmitButton
              disabled={isLoading || !watchedFromCurrency || !watchedToCurrency || !watchedAmount}
              isLoading={isLoading}
            />
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
};

export default CurrencySwapForm;