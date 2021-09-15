import React from "react";
import { Box, Flex } from "@chakra-ui/layout";

import ChannelHeader from "../shared/ChannelHeader";
// import ChannelNameBanner from "../admin/subs/ChannelNameBanner/ChannelNameBanner";
import MessageCardContainer from "./subs/MessageCardContainer/MessageCardContainer";
// import InputFieldComponent from "./subs/InputFieldComponent/InputFieldComponent";
import MessageInput from "../shared/MessageInput";
import Thread from "../thread/Thread";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Lorem,
  Button
} from "@chakra-ui/react"

const MessageBoardIndex = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box bg="#F9F9F9" m="5px">
      <Flex>
        <Box width="85vw">
        <ChannelHeader />
        <Box m="5px" bg="white" overflowY="scroll" height={["75vh","75vh", "80vh", "72vh"]}
        css={{
        "&::-webkit-scrollbar": {
          width: "0",
        },
        "&::-webkit-scrollbar-track": {
          width: "0",
        }
      }}>
          <MessageCardContainer />
        </Box>
        <MessageInput />
        </Box>
        <Box>
          <Thread/>
        </Box>
      </Flex>
    </Box>
  );
};

export default MessageBoardIndex;
