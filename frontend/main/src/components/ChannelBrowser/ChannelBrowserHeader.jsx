import React from "react";
import { Box, HStack } from "@chakra-ui/layout";
import {
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import CreateChannelModal from "../createChannel/createChannelModal";
import { useDisclosure } from "@chakra-ui/hooks";


const ChannelBrowserHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width="100%" mt="5px">
      <Flex
        flexShrink={0}
        ml="1px"
        align="center"
        bgColor="#00B87C"
        height="44px"
        boxShadow="xs"
        maxWidth="100%"
        w="100%"
        pl={6}
        pr={6}
      >
        <Box
          as="span"
          letterSpacing="wide"
          lineHeight="32px"
          fontSize="17px"
          color="#ffffff"
          fontWeight="400"
          mr={1}
        >
          Channel Browser
        </Box>

        <Spacer />
        <Button
          onClick={onOpen}
          size="sm"
          borderColor="white"
          variant="outline"
          color="white"
          colorScheme="#00B87C"
          borderRadius="4px"
          fontSize="14px"
          sx={{"@media screen and (max-width: 768.5px)": { display: "none",},}}
        >
          Create New channel
        </Button>
        <CreateChannelModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
};

export default ChannelBrowserHeader;
