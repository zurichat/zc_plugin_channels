import React from "react";
import { Box, Flex } from "@chakra-ui/layout";

import ChannelHeader from '../../../shared/ChannelHeader'
import EmptyMessageCardContainer from "./EmptyMessageCardContainer";


import DisabledInput from '../../../shared/DiasbledInput'


const MessageBoardEmpty = () => {  

  return (
    <Box bg="#F9F9F9" m="5px" width="99%">
      <Flex>
        <Box width="100%">
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
          <EmptyMessageCardContainer />
        </Box>
        <DisabledInput />
        </Box>
        {/* <Box>
          <Thread/>
        </Box> */}
      </Flex>
    </Box>
  );
};

export default MessageBoardEmpty;
