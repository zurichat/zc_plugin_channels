import React, { useState, useEffect }from "react";
import { Box, Flex } from "@chakra-ui/layout";

import ChannelHeader from "../shared/ChannelHeader";
// import ChannelNameBanner from "../admin/subs/ChannelNameBanner/ChannelNameBanner";
import MessageCardContainer from "./subs/MessageCardContainer/MessageCardContainer";
// import InputFieldComponent from "./subs/InputFieldComponent/InputFieldComponent";
import MessageInput from "../shared/MessageInput";
// import Thread from "../thread/Thread";
//import MessageOptionsPopUpMenu from "./subs/MessageOptionsPopUpMenu/MessageOptionsPopUpMenu";

import { useParams } from "react-router";
import DisabledInput from "../shared/DiasbledInput";
import CentrifugoComponent from "./subs/Centrifugo/CentrifugoComponent";


const MessageBoardIndex = () => {

  return (
    <Box bg="#F9F9F9" m="5px" width="99%">
    <CentrifugoComponent />
      <Flex>
        <Box width="100%">
        <ChannelHeader />
        <Box m="5px" bg="white" overflowY="scroll" height={["73vh","75vh", "60vh", "58vh"]}
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
        {/* <Box>
          <Thread/>
        </Box> */}
      </Flex>
    </Box>
  );
};

export default MessageBoardIndex;
