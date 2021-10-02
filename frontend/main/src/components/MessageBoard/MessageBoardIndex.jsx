import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import APIservice from "../../utils/api";
import { USER_CAN_INPUT , GET_CHANNELMESSAGES } from "../../redux/actions/types";

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
import Centrifuge from 'centrifuge';

import { SubscribeToChannel } from '@zuri/control'




const MessageBoardIndex = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch()

  const { channelDetails } = useSelector((state) => state.channelsReducer);

  const { channelMessages, sockets, renderedMessages, users } = useSelector((state) => state.appReducer)
  const { _getChannelMessages, _getSocket } = bindActionCreators(appActions, dispatch)
  const canInput = channelDetails.allow_members_inpu

  
  const socketName = sockets.socket_name

  if(socketName){
    console.log('\n\n\n\n we have a valid socket name now \n\n\n')
    try{    
      SubscribeToChannel(sockets.socket_name, function(messageCtx) {
        console.log('\n\n\n From Centrifugo', messageCtx )

        // Check the type of event from centrifugo
        const event = messageCtx.event.action
        switch(event){
          case 'join:channel':{
            dispatch({})
            break;
          }


          default:{
            dispatch({ type: GET_CHANNELMESSAGES, payload: [...channelMessages, messageCtx.data] })
          }

        }
        dispatch({ type: GET_CHANNELMESSAGES, payload: [...channelMessages, messageCtx.data] })
        console.log("\n\n\nTesting rendered messages: ", renderedMessages);
        })
    }

    catch(err){
      console.log('\n\n\n we tried to subcribe, got this error: \n',err,'\n\n\n\n')
    }
  }
  else{
    console.log('We have not fetched the socket name')
  }
  
   



   


  useEffect(() => {

    async function subscribe(){

      await _getSocket("614679ee1a5607b13c00bcb7", channelId)
      console.log("We've gotten the socket details")
     

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
          {channelDetails.allow_members_input ? <MessageInput channelId={channelId} /> : <DisabledInput />}
        </Box>
        {/* <Box>
          <Thread/>
        </Box> */}
      </Flex>
    </Box>
  );
};

export default MessageBoardIndex;
