import { Box, Flex, Link, Text, Button } from "@chakra-ui/react";
import React from "react";
import { BiUserPlus } from "react-icons/bi";
import { useDisclosure } from "@chakra-ui/react";
import AddPeopleModal from "./addPeopleModal";
import { Circle, HStack } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";

const ChannelBody = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width="80%" m="auto" height="sm" fontSize="16px">
      <AddPeopleModal isOpen={isOpen} onClose={onClose} />

      <Text color="black" mt="2rem">
        This is the very beginning of the{" "}
        <Link color="#0562ed" fontWeight="bold" mr="0.3rem">
          #Announcement
        </Link>
        channel
      </Text>
      <Text color="grey">
        <Link color="#0562ed" fontWeight="bold">
          @Abibola
        </Link>{" "}
        created this channel on Aug 30th.
      </Text>

      <HStack mt="6">
        <Circle
          cursor="pointer"
          bg="whatsapp.600"
          color="white"
          size="35px"
          onClick={onOpen}
        >
          <Icon as={BiUserPlus} />
        </Circle>
        <Text cursor="pointer" onClick={onOpen}>
          Add Members
        </Text>
      </HStack>
    </Box>
  );
};

export default ChannelBody;
