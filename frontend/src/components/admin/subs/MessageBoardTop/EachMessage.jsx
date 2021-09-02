import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Avatar, Button } from "@chakra-ui/react";

function EachMessage({userName,src, messageTime,messageContent}) {
  return (
    <Flex width="100%" bg="#fff" mb="20px">
      <Box mr="11px">
        <Avatar src={src} alt="" boxSize="36px" />
      </Box>
      <Box>
        <Flex>
          <Text mr="9px" fontSize="15px" as="b" c="#242424">
            {userName}
          </Text>
          <Text fontSize="15px" c="#8B8B8B">
            {messageTime}
          </Text>
        </Flex>
        <Text w="571px" fontSize="15px" c="#3A3A3A">
          {messageContent}
        </Text>
      </Box>
    </Flex>
  );
}

export default EachMessage;
