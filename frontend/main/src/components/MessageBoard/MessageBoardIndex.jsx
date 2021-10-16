import React, { useState, useEffect, useMemo } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
// import APIservice from "../../utils/api";
import { USER_CAN_INPUT, GET_CHANNELMESSAGES, ADD_CHANNELMESSAGES, UPDATE_CHANNELMESSAGES, DELETE_CHANNELMESSAGES } from "../../redux/actions/types";


import ChannelHeader from "../shared/ChannelHeader";
// import ChannelNameBanner from "../admin/subs/ChannelNameBanner/ChannelNameBanner";
import MessageCardContainer from "./subs/MessageCardContainer/MessageCardContainer";
// import InputFieldComponent from "./subs/InputFieldComponent/InputFieldComponent";
import MessageInput from "../shared/MessageInput";
// import Thread from "../thread/Thread";
//import MessageOptionsPopUpMenu from "./subs/MessageOptionsPopUpMenu/MessageOptionsPopUpMenu";

import { useParams } from "react-router";
import DisabledInput from "../shared/DiasbledInput";
// import CentrifugoComponent from "./subs/Centrifugo/CentrifugoComponent";
// import Centrifuge from 'centrifuge';
// import { SubscribeToChannel } from '@zuri/control'

//notifications
import notificationsManager from "./subs/Centrifugo/NotificationsManager";
import Centrifugo from "../../utils/centrifugo";
import { MessageBoard } from '@zuri/zuri-ui';

const MessageBoardIndex = () => {

  const { channelId } = useParams();
  const dispatch = useDispatch()

  const { channelDetails } = useSelector((state) => state.channelsReducer);

  const { channelMessages, sockets, renderedMessages, users, workspace_users } = useSelector((state) => state.appReducer)
  const { _getChannelMessages, _getSocket, _getNotifications } = bindActionCreators(appActions, dispatch)
  const canInput = channelDetails.allow_members_input || true




  // const [ orgId, setOrgId ] = useState()





  // We will attempt to connect only when we are certain that the state has been updated
  // so we first check that sockets.socket_name is not undefined

  /*   
    if(socketName){
      try{
          console.log('we have succesfully fetched the socket_name: ',socketName)
          SubscribeToChannel(socketName, function(messageCtx) {
            console.log('\n\n\n From centrifugo', messageCtx)
            const action = messageCtx.data.event.action
  
            switch(action){
              case 'join:channel' || 'leave:channel' || 'create:message' :{
                dispatch({ type: GET_CHANNELMESSAGES, payload: [...channelMessages, messageCtx.data] })
                notificationsManager(messageCtx.data.content)
                break;
              }
  
              case 'update:message':{
                const messageId = messageCtx.data._id
                const channelMessagesCopy = [...channelMessages]
                channelMessagesCopy.find((o, i) => {
                  if (o._id === messageId) {
                      channelMessagesCopy[i] = messageCtx.data;
                      return true; // stop searching
                          }
                      });
                
                dispatch({ type: GET_CHANNELMESSAGES, payload: channelMessagesCopy })
                break;
              }
  
              case 'delete:message':{
                const messageId = messageCtx.data._id
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
          
        })
        }
  
        catch(err){
          console.log('\n\n\n we tried to subcribe to zuri main RTC, but got this error: \n',err,'\n\n\n\n')
        }
    } else{
      console.log("\n\n\n\nwe have not been able to fetch the socket\n\n\n")
    }
   */

  useEffect(() => {
    if (users && users.currentWorkspace) {
      _getSocket(users.currentWorkspace, channelId)
      _getNotifications(users.currentWorkspace, channelId, users.currentWorkspace)
    }
  }, [users])

  const reactToCreateMessageOrJoinOrLeaveChannel = React.useCallback((ctx) => {
    dispatch({ type: ADD_CHANNELMESSAGES, payload: ctx.data })
    // notificationsManager(ctx.data.content)
  }, [])

  const chatSidebarConfig = useMemo(() => ({
    sendChatMessageHandler: (msg) => {
      dispatch(
        handleCreateRoomMessages(org_id, room_id, {
          sender_id: loggedInUser_id,
          room_id,
          message: msg.message,
        })
      );
    },
    currentUserData: {
      username: 'Aleey',
      imageUrl: '',
    },
    messages: [
      {
        username: 'Pidoxy',
        id: 7,
        time: '7:05PM',
        imageUrl: '',
        emojis: [
          { name: 'smiling', count: 4, emoji: '😋' },
          { name: 'grining', count: 1, emoji: '😊' },
        ],
        richUiData: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '543og',
              text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;. Nulla porttitor accumstincidunt.',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
      {
        username: 'Fortune',
        id: 7,
        time: '9:35PM',
        imageUrl: '',
        emojis: [
          { name: 'cool', count: 4, emoji: '😎' },
          { name: 'celebrate', count: 1, emoji: '🎉' },
        ],
        richUiData: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '543og',
              text: 'Qwertitgv asfjf jheiuhie vehhoe trices posdf sjde dewl;. Nulla porttitor accumstincidunt.',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
      {
        username: 'Daetoun',
        id: 7,
        time: '12:15PM',
        imageUrl: '',
        emojis: [
          { name: 'cool', count: 9, emoji: '🥳' },
          { name: 'celebrate', count: 11, emoji: '🥂' },
        ],
        richUiData: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '543og',
              text: 'Portiioe asfjf jgjgioef vehhoe rtuwodd posdf sjde dewl;. Nulla porttitor accumstincidunt.',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    ],
    showChatSideBar: true,
    chatHeader: 'Chats',
  }));

  if (!Centrifugo.isMessageRTCSet) {
    if (sockets && sockets.socket_name) {
      const socketName = sockets.socket_name

      Centrifugo.initForMessage(socketName)
      Centrifugo.addMessageListener('create:message', reactToCreateMessageOrJoinOrLeaveChannel)
      Centrifugo.addMessageListener('join:channel', reactToCreateMessageOrJoinOrLeaveChannel)
      Centrifugo.addMessageListener('leave:channel', reactToCreateMessageOrJoinOrLeaveChannel)
      Centrifugo.addMessageListener('update:message', (ctx) => {
        dispatch({ type: UPDATE_CHANNELMESSAGES, payload: ctx.data })
      })
      Centrifugo.addMessageListener('delete:message', (ctx) => {
        dispatch({ type: DELETE_CHANNELMESSAGES, payload: ctx.data })
      })
    }
  }






  //The useEffect runs once chanelId has changed, 
  //and this is when channels has been switched. The channelId is then 
  //used to fetch the new socket details. Once the state is updated, the subscribeToChannel
  //function runs again to update the centrifugo
  // useEffect(() => {

  //   async function updateSocketName(){


  //     await _getSocket(users.currentWorkspace, channelId)
  //     console.log("We've gotten the socket details")


  //   }

  //   updateSocketName()

  // }, [channelId]);

  // useEffect(() => {
  //   if(users){
  //     setOrgId(users[0])
  //   }
  // }, [])

  //  const retrieveNotificationSettings = () =>{
  //    _getNotifications(orgId?.org_id, channelId, orgId?._id)
  // }

  // useEffect(() =>{
  //   if(orgId){
  //     retrieveNotificationSettings()
  //   }
  //" })

  return (
    // <>
    //   <MessageBoard />
    // </>
    <Box bg="#F9F9F9" width="99%">
      <Flex>
        <Box width="100%">
          <ChannelHeader channelId={channelId} org_id={users.currentWorkspace} />
          <MessageBoard chatsConfig={chatSidebarConfig}/>

          {/* <Box
            m="5px"
            bg="white"
            overflowY="scroll"
            height={["93vh", "95vh", "75vh", "68vh"]}
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
          {canInput ? <MessageInput channelId={channelId} /> : <DisabledInput />} */}
        </Box>
        {/* <Box>
          <Thread/>
        </Box> */}
      </Flex>
    </Box>
  );
};

export default MessageBoardIndex;
