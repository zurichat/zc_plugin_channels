import React from "react";
import { Box } from "@chakra-ui/layout";

import ChannelDetailsContainer from "./subs/ChannelDetailsContainer/ChannelDetailsContainer";
import MessageCardContainer from "./subs/MessageCardContainer/MessageCardContainer";
import InputFieldComponent from "./subs/InputFieldComponent/InputFieldComponent";

const MessageBoardIndex = () => {
  return (
    <Box>
      <ChannelDetailsContainer />
      <Box overflowY="scroll" height={["75vh","79vh", "80vh", "75vh"]}>
        <MessageCardContainer />
      </Box>
      <InputFieldComponent />
    </Box>
  );
};

export default MessageBoardIndex;
