import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import APIservice from "../../utils/api";
import { USER_CAN_INPUT } from "../../redux/actions/types";

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

import { SubscribeToChannel } from '@zuri/control'


const MessageBoardIndex = () => {
  
  const { channelId } = useParams()
  const { channelDetails } = useSelector((state) => state.channelsReducer)

  const { channelMessages, sockets, renderedMessages, users } = useSelector((state) => state.appReducer)

  const canInput = channelDetails.allow_members_inpu


  useEffect(() => {

    async function subscribe(){

      await SubscribeToChannel(sockets.socket_name, function(messageCtx) {
      console.log("\n\n\nfrom centrifugo: ", messageCtx,'\n\n\n');
      dispatch({ type: GET_CHANNELMESSAGES, payload: [...channelMessages, messageCtx.data] })
      console.log("\n\n\nTesting rendered messages: ", renderedMessages);
    })

    }
    
    subscribe()

   }, [channelId]);


  return (
    <Box bg="#F9F9F9" m="5px" width="99%">
      <Flex>
        <Box width="100%">
          <ChannelHeader channelId={channelId} />
          <Box
            m="5px"
            bg="white"
            overflowY="scroll"
            height={["73vh", "75vh", "60vh", "58vh"]}
            css={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
              "&::-webkit-scrollbar-track": {
                width: "0",
              },
            }}
          >
            <MessageCardContainer channelId={channelId} />
          </Box>
          {canInput ? <MessageInput channelId={channelId} /> : <DisabledInput />}
        </Box>
        {/* <Box>
          <Thread/>
        </Box> */}
      </Flex>
    </Box>
  );
};

export default MessageBoardIndex;
