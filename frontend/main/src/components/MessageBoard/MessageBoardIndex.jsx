import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
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
// import Thread from "../thread/Thread";
//import MessageOptionsPopUpMenu from "./subs/MessageOptionsPopUpMenu/MessageOptionsPopUpMenu";

import { useParams } from "react-router";
import DisabledInput from "../shared/DiasbledInput";
import CentrifugoComponent from "./subs/Centrifugo/CentrifugoComponent";
import Centrifuge from 'centrifuge';

import { SubscribeToChannel } from '@zuri/control'

//notifications
import notificationsManager from "./subs/Centrifugo/NotificationsManager";




const MessageBoardIndex = ({allUsers, org_id}) => {

  const { channelId } = useParams();
  const dispatch = useDispatch()

  const { channelDetails } = useSelector((state) => state.channelsReducer);

  const { channelMessages, sockets, renderedMessages, users, workspace_users } = useSelector((state) => state.appReducer)
  const { _getChannelMessages, _getSocket, _getNotifications } = bindActionCreators(appActions, dispatch)
  const canInput = channelDetails.allow_members_inpu

  const [ orgId, setOrgId ] = useState()

  
console.log("\n\n Workspace users: \n\n",workspace_users)


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
              notificationsManager(messageCtx.data.content)
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

      
      await _getSocket(org_id, channelId)
      console.log("We've gotten the socket details")
      
      
    }
    
    updateSocketName()

  }, [channelId]);

  useEffect(() => {
    if(users){
      setOrgId(users[0])
    }
  }, [])

   const retrieveNotificationSettings = () =>{
     _getNotifications(orgId?.org_id, channelId, orgId?._id)
  }

  useEffect(() =>{
    if(orgId){
      retrieveNotificationSettings()
    }
  }, [])

  return (
    <>
    {Object.keys(workspace_users).length > 0 ?  
      <Box bg="#F9F9F9" width="99%">
      <Flex>
        <Box width="100%">
          <ChannelHeader channelId={channelId} org_id={users.currentWorkspace} />
          <Box
            m="5px"
            bg="white"
            overflowY="scroll"
            height={["83vh", "85vh", "65vh", "58vh"]}
            css={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
              "&::-webkit-scrollbar-track": {
                width: "0",
              },
            }}
          >

            <MessageCardContainer channelId={channelId}  allUsers={allUsers} org_id={org_id} />
          </Box>
          {channelDetails.allow_members_input ? <MessageInput channelId={channelId} /> : <DisabledInput />}
        </Box>
        {/* <Box>
          <Thread/>
        </Box> */}
      </Flex>
    </Box>
    : <Text textAlign="center" fontSize="5rem" color="red">Loading...</Text>}
    
    </>
  );
};

export default MessageBoardIndex;
