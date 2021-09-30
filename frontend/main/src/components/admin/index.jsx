import React from "react";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import MessageBoardTop from "./subs/MessageBoardTop/MessageBoardTop";
// import MessageInput from "./subs/MessageInput";
import MessageInput from "../shared/MessageInput";
import ChannelDetails from "./subs/channelDetails";
import ChannelHeader from '../shared/ChannelHeader'


const Admin = () => {
  return (
    <HStack bg="#F9F9F9" h="max" spacing={0}>
      <VStack
        mx="10px"
        flex="3"
        position="relative"
        alignSelf="stretch"
        justifyContent="flex-end"
        spacing={2}
      >
        <ChannelHeader />
        <MessageBoardTop />
        <MessageInput />
      </VStack>
      <Box flex="1">
        <ChannelDetails />
      </Box>
    </HStack>
  );
};

export default Admin;
