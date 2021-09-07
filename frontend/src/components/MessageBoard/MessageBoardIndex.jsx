import React from "react";
import { Box, Flex } from "@chakra-ui/layout";

import ChannelDetailsContainer from "./subs/ChannelDetailsContainer/ChannelDetailsContainer";
import MessageCardContainer from "./subs/MessageCardContainer/MessageCardContainer";
import InputFieldComponent from "./subs/InputFieldComponent/InputFieldComponent";
import Thread from "../thread/Thread";

const MessageBoardIndex = () => {
  return (
    <Box>
      <ChannelDetailsContainer />
      <Flex><Box><Box overflowY="scroll" height={["75vh","79vh", "80vh", "75vh"]}>
        <MessageCardContainer />
      </Box>
      <InputFieldComponent /></Box>
      <Thread/></Flex>
    </Box>
  );
};

export default MessageBoardIndex;
