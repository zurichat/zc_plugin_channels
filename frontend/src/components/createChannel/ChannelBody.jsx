import { Box, Flex, Link, Text, Button } from "@chakra-ui/react";
import React from "react";
import { BiUserPlus } from "react-icons/bi";
import { useDisclosure } from "@chakra-ui/react";
import AddPeopleModal from "./addPeopleModal";

const ChannelBody = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box width="80%" m="auto" height="sm" pt="3rem" fontSize="16px">
      <Text color="black">
        This is the very beginning of the{" "}
        <Link color="#0562ed" fontWeight="bold">
          {" "}
          #Announcement
        </Link>{" "}
        channel
      </Text>
      <Text color="grey">
        <Link color="#0562ed" fontWeight="bold">
          @Abibola
        </Link>{" "}
        created this channel on Aug 30th.
      </Text>

      <Box mt="6" cursor="pointer">
        <Flex alignItems="center">
          <p
            style={{
              backgroundColor: "#00B87C",
              padding: ".3rem",
              borderRadius: "50%",
            }}
          >
            <BiUserPlus color="white" fontSize="1.3rem" />
          </p>
          <AddPeopleModal />
        </Flex>
      </Box>
    </Box>
  );
};

export default ChannelBody;
