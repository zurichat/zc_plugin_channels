import React from "react";
import { Box, Flex } from "@chakra-ui/layout";

import ChannelHeader from "../shared/ChannelHeader";
// import ChannelNameBanner from "../admin/subs/ChannelNameBanner/ChannelNameBanner";
import MessageCardContainer from "./subs/MessageCardContainer/MessageCardContainer";
// import InputFieldComponent from "./subs/InputFieldComponent/InputFieldComponent";
import MessageInput from "../shared/MessageInput";
// import Thread from "../thread/Thread";
//import MessageOptionsPopUpMenu from "./subs/MessageOptionsPopUpMenu/MessageOptionsPopUpMenu";




const MessageBoardIndex = () => {  
  return (
    <Box bg="#F9F9F9" m="5px">
      <Flex>
        <Box width="95vw">
        <ChannelHeader />
        <Box m="5px" bg="white" overflowY="scroll" height={["73vh","75vh", "68vh", "68vh"]}
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
