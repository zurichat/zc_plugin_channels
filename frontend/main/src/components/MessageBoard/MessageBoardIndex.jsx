import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import APIservice from "../../utils/api";
import { USER_CAN_INPUT, GET_CHANNELMESSAGES } from "../../redux/actions/types";

import ChannelHeader from "../shared/ChannelHeader";
// import ChannelNameBanner from "../admin/subs/ChannelNameBanner/ChannelNameBanner";
import MessageCardContainer from "./subs/MessageCardContainer/MessageCardContainer";
// import InputFieldComponent from "./subs/InputFieldComponent/InputFieldComponent";
import MessageInput from "../shared/MessageInput";
import Thread from "../thread/Thread";
//import MessageOptionsPopUpMenu from "./subs/MessageOptionsPopUpMenu/MessageOptionsPopUpMenu";
import { Collapse } from "@chakra-ui/transition";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router";
import DisabledInput from "../shared/DiasbledInput";
import CentrifugoComponent from "./subs/Centrifugo/CentrifugoComponent";
import Centrifuge from 'centrifuge';

import { SubscribeToChannel } from '@zuri/control'




const MessageBoardIndex = ({allUsers}) => {

  const { channelId } = useParams();
  const dispatch = useDispatch()

  const { channelDetails } = useSelector((state) => state.channelsReducer);

  const { channelMessages, sockets, renderedMessages, users } = useSelector((state) => state.appReducer)
  const { _getChannelMessages, _getSocket } = bindActionCreators(appActions, dispatch)
  const canInput = channelDetails.allow_members_inpu

  



  // We will attempt to connect only when we are certain that the state has been updated
  // so we first check that sockets.socket_name is not undefined

  const socketName = sockets.socket_name
  
  if(socketName){
    try{
        console.log('we have succesfully fetched the socket_name: ',socketName)
        SubscribeToChannel(socketName, function(messageCtx) {
          console.log('\n\n\n From centrifugo', messageCtx)
          const action = messageCtx.event.action
          switch(action){

            case 'join:channel' || 'leave:channel' || 'create:message' :{
              dispatch({ type: GET_CHANNELMESSAGES, payload: [...channelMessages, messageCtx.data] })
              break;
            }

            case 'update:message':{
              const messageId = messageCtx._id
              const channelMessagesCopy = [...channelMessages]
              channelMessagesCopy.find((o, i) => {
                if (o._id === messageId) {
                    channelMessagesCopy[i] = messageCtx;
                    return true; // stop searching
                        }
                    });
               
              dispatch({ type: GET_CHANNELMESSAGES, payload: channelMessagesCopy })
              break;
            }

            case 'delete:message':{
              const messageId = messageCtx._id
              const channelMessagesCopy = [...channelMessages]
              channelMessagesCopy.find((o, i) => {
                if (o._id === messageId) {
                    channelMessagesCopy.splice(i,1);
                    return true; // stop searching
                        }
                    });
              
              dispatch({ type: GET_CHANNELMESSAGES, payload: channelMessagesCopy })
              break;
            }

            default:{
              dispatch({ type: GET_CHANNELMESSAGES, payload: [...channelMessages, messageCtx.data] })
            }
          }
        console.log("\n\n\nfrom centrifugo: ", messageCtx,'\n\n\n');
        dispatch({ type: GET_CHANNELMESSAGES, payload: [...channelMessages, messageCtx.data] })
        
      })
      }

      catch(err){
        console.log('\n\n\n we tried to subcribe to zuri main RTC, but got this error: \n',err,'\n\n\n\n')
      }
  } else{
    console.log("\n\n\n\nwe have not been able to fetch the socket\n\n\n")
  }
  
   





  //The useEffect runs once chanelId has changed, 
  //and this is when channels has been switched. The channelId is then 
  //used to fetch the new socket details. Once the state is updated, the subscribeToChannel
  //function runs again to update the centrifugo
  useEffect(() => {

    async function updateSocketName(){

      
      await _getSocket("614679ee1a5607b13c00bcb7", channelId)
      console.log("We've gotten the socket details")
      
      
    }
    
    updateSocketName()

  }, [channelId]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="#F9F9F9" width="99%">
      <Flex>
        <Box width="100%">
          <ChannelHeader channelId={channelId} />
          <Box
            m="5px"
            bg="white"
            overflowY="scroll"
            height={["83vh", "85vh", "70vh", "68vh"]}
            css={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
              "&::-webkit-scrollbar-track": {
                width: "0",
              },
            }}
          >

            <MessageCardContainer channelId={channelId} onOpen={onOpen} />
            <MessageCardContainer channelId={channelId} allUsers={allUsers} />
          </Box>
          {channelDetails.allow_members_input ? <MessageInput channelId={channelId} /> : <DisabledInput />}
        </Box>
        <Collapse in={isOpen}>
          <Box>
            <Thread onClose={onClose} />
          </Box>
        </Collapse>
      </Flex>
    </Box>
  );
};

export default MessageBoardIndex;
