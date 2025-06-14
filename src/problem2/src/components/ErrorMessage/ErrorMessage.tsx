import React from 'react';
import { Text } from "@radix-ui/themes";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Text color="red" size="1" className="mt-1">
    {message}
  </Text>
);

export default ErrorMessage;