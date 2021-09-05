import React, { useState } from "react";
import { Stack, Input, Container, Box } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { IoFlashOutline } from "react-icons/io5";
import { FiBold, FiLink, FiAtSign } from "react-icons/fi";
import { AiOutlineItalic } from "react-icons/ai";
import { MdFormatListBulleted, MdSend } from "react-icons/md";
import { ImAttachment } from "react-icons/im";

function MessageForm() {
  const [focused, setFocused] = useState(false);

  return (
    <Stack
      bg="white"
      h="94px"
      display="block"
      maxW="350px"
      margin="5px"
      border="1px solid #EBEBEB"
      borderRadius="3px"
    >
      <Input
        onFocus={() => setFocused(true)}
        outline="none"
        pl="8px"
        fontSize="15px"
        width="100%"
        height="50px"
        margin="0"
        maxW="340px"
        placeholder="Send a message to John"
        border="none"
        _placeholder={{ color: "#BEBEBE" }}
      />
      <Container display="flex" justifyContent="space-between">
        <Box display="flex">
          <Icon
            p="8px"
            pr="10px"
            ml="5px"
            borderRight="1px solid #EBEBEB"
            color="#8B8B8B"
            as={IoFlashOutline}
          />
          <Icon p="8px" color="#8B8B8B" as={FiBold} />
          <Icon p="8px" color="#8B8B8B" as={AiOutlineItalic} />
          <Icon p="8px" color="#8B8B8B" as={FiLink} />
          <Icon p="8px" color="#8B8B8B" as={MdFormatListBulleted} />
        </Box>
        <Box display="flex">
          <Icon p="8px" color="#8B8B8B" as={FiAtSign} />
          <Icon p="8px" color="#8B8B8B" as={ImAttachment} />
          <Icon
            style={{
              backgroundColor: focused ? "#00B87C" : "",
              color: focused ? "white" : "",
            }}
            p="8px"
            mr="5px"
            color="#8B8B8B"
            as={MdSend}
          />
        </Box>
      </Container>
    </Stack>
  );
}

export default MessageForm;
