import React from "react";
import { Avatar, Spacer, Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { BiChevronDown, BiUserPlus } from "react-icons/bi";
import { Box, HStack } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";

const TopBar = () => {
  return (
    <Box bg="white" p={4} borderRadius="2px">
      <HStack alignItems="center">
        <Heading as="h5" size="sm">
          # Announcements
        </Heading>

        <Icon as={BiChevronDown} />

        <Spacer />
        <HStack spacing={4}>
          <Avatar
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt=""
            boxSize="36px"
          />

          <Text fontWeight="bold">1</Text>
          <Icon boxSize="22px" as={BiUserPlus} />
        </HStack>
      </HStack>
    </Box>
  );
};

export default TopBar;
