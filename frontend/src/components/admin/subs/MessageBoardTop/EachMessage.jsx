import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image, Button } from "@chakra-ui/react";

function EachMessage(props) {
  return (
    <Flex width="100%" bg="#fff" mb="20px">
      <Box mr="11px">
        <Image borderRadius="full" boxSize="36px" src={props.src} alt="" />
      </Box>
      <Box>
        <Flex>
          <Text mr="9px" fontSize="15px" as="b" c="#242424">
            {props.userName}
          </Text>
          <Text fontSize="15px" c="#8B8B8B">
            {props.messageTime}
          </Text>
        </Flex>
        <Text w="571px" fontSize="15px" c="#3A3A3A">
          {props.messageContent}
        </Text>
      </Box>
    </Flex>
  );
}

export default EachMessage;
