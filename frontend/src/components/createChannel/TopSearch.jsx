import { Avatar, Box } from "@chakra-ui/react";
import { Flex, Input } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/layout";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { Icon } from "@chakra-ui/icon";
import { AvatarBadge } from "@chakra-ui/avatar";

const TopSearch = () => {
  return (
    <HStack mb={4} justifyContent="space-between">
      <Input
        placeholder="Search here"
        borderRadius="md"
        borderColor="rgba(153, 153, 153, 0.2)"
        color="#999"
        size="md"
        w="34%"
      />

      <HStack spacing={4}>
        <Icon boxSize="1.3rem" color="#2b2b2b" as={FiSettings} />
        <Avatar
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt=""
        >
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      </HStack>
    </HStack>
  );
};

export default TopSearch;
