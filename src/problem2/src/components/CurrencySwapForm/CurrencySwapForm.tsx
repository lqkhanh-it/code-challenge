import React, { useEffect } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Flex, Text } from "@radix-ui/themes";
import { useSwapStore } from '@/store/useSwapStore';
import { getRate } from '@/utils/rate';
import AmountInput from '@/components/AmountInput';
import TokenSelect from '@/components/TokenSelect';
import type { FormData, SwapResponse } from '@/types';
import ErrorMessage from '@/components/ErrorMessage';
import SubmitButton from '@/components/SubmitButton';
import { useAppToast } from '@/hooks/useAppToast';
import Addition from '@/components/Addition';
import { currencyApi } from '@/services/currencyApi';
import { validateForm } from '@/utils/validation';

interface CurrencySwapFormProps {
  onSwapSuccess: (response: SwapResponse) => void;
}

const CurrencySwapForm: React.FC<CurrencySwapFormProps> = ({ onSwapSuccess }) => {
  const { tokens, isLoading, error, setLoading, setError } = useSwapStore();
  const methods = useForm<FormData>({
    defaultValues: {
      fromAmount: '',
      toAmount: '',
      fromCurrency: '',
      toCurrency: ''
    },
    mode: 'onChange'
  });

  const { watch, setValue, formState: { errors }, handleSubmit, register } = methods;
  const watchedAmount = watch('fromAmount');
  const watchedFromCurrency = watch('fromCurrency');
  const watchedToCurrency = watch('toCurrency');

  const toast = useAppToast();

  useEffect(() => {
    if (watchedFromCurrency && watchedToCurrency) {
      const rate = getRate({
        fromCurrency: watchedFromCurrency,
        toCurrency: watchedToCurrency,
        tokens
      });

      if (rate) {
        const toAmount = (parseFloat(watchedAmount) * parseFloat(rate)).toString();
        setValue('toAmount', toAmount);
      }
    }
  }, [watchedAmount, watchedFromCurrency, watchedToCurrency, tokens, setValue]);

  useEffect(() => {
    const validationErrors = validateForm({
      fromAmount: watchedAmount,
      fromCurrency: watchedFromCurrency,
      toCurrency: watchedToCurrency,
    });

    if (Object.keys(validationErrors).length === 0) {
      methods.clearErrors();
    }
  }, [methods, watchedAmount, watchedFromCurrency, watchedToCurrency]);

  const onSubmit = async (data: FormData) => {
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        methods.setError(field as keyof FormData, { message });
      });
      toast.error(validationErrors.fromAmount || validationErrors.toCurrency || validationErrors.fromCurrency || validationErrors.toAmount);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response: SwapResponse = await currencyApi.executeSwap({
        fromCurrency: data.fromCurrency,
        toCurrency: data.toCurrency,
        amount: parseFloat(data.fromAmount),
      });

      toast.success(
        `Successfully swapped ${response.fromAmount} ${data.fromCurrency} to ${response.toAmount.toFixed(6)} ${data.toCurrency}\nTransaction ID: ${response.transactionId}`
      );

      onSwapSuccess(response);
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
        <Flex direction="column" gap="4">
          <Flex direction={{ initial: "column", sm: "row" }} align="end" gap="4">
            <TokenSelect
              label="From"
              value={watchedFromCurrency}
              onChange={(value) => setValue('fromCurrency', value)}
            />
            <AmountInput
              name="fromAmount"
              label="You pay"
              placeholder="0.0"
              register={register}
              error={!!errors.fromAmount?.message}
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
              label="You receive"
              placeholder="0.0"
              register={register}
            />
          </Flex>
          <Flex direction="column" gap="1" className="mt-2">
            {errors.toCurrency && (
              <Text size="1" color="red">
                {errors.toCurrency.message}
              </Text>
            )}
            {errors.fromAmount && (
              <Text size="1" color="red">
                {errors.fromAmount.message}
              </Text>
            )}
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