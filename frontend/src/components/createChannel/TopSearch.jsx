import { Avatar, Box } from "@chakra-ui/react";
import { Flex, Input } from "@chakra-ui/react";
import React from "react";
import { FiSettings } from "react-icons/fi";

const TopSearch = () => {
  return (
    <Flex mb={4} justifyContent="space-between">
      <Input
        placeholder="Search here"
        borderRadius="none"
        borderColor="rgba(153, 153, 153, 0.2)"
        border="1px"
        color="#999"
        fontWeight="normal"
        width="30rem"
      />

      <Flex
        mr="11px"
        width="3.5rem"
        justifyContent="space-between"
        alignItems="center"
      >
        <FiSettings color="#2b2b2b" fontSize="1.2rem" />
        <Avatar
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt=""
          boxSize="30px"
        />
      </Flex>
    </Flex>
  );
};

export default TopSearch;
