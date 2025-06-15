import { Flex, Text } from "@radix-ui/themes";

const Header = () => {
  return (
    <Flex direction="column" align="center" className="mb-2 py-4 px-4 rounded-xl">
      <Text 
        size="8" 
        weight="bold" 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
      >
        Token Swap
      </Text>
      <Text size="4" color="gray" className="mb-2">
        Fast and secure token swap
      </Text>
    </Flex>
  );
};

export default Header;
