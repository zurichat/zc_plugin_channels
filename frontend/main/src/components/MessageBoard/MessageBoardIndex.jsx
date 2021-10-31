import React, { useEffect, useMemo } from "react"
import { Box, Flex } from "@chakra-ui/layout"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { useParams } from "react-router"
import { MessageBoard } from "@zuri/zuri-ui"
import appActions from "../../redux/actions/app"
import {
  ADD_CHANNELMESSAGES,
  UPDATE_CHANNELMESSAGES,
  DELETE_CHANNELMESSAGES
} from "../../redux/actions/types"

import ChannelHeader from "../shared/ChannelHeader"
import Centrifugo from "../../utils/centrifugo"
import instance from "../../utils/utils"

const MessageBoardIndex = () => {
  const { channelId } = useParams()
  const dispatch = useDispatch()

  // const { channelDetails } = useSelector(state => state.channelsReducer)

  const { channelMessages, sockets, users, workspaceUsersObject } = useSelector(
    state => state.appReducer
  )
  const { _getChannelMessages, _getSocket, _getNotifications, _sendMessage } =
    bindActionCreators(appActions, dispatch)
  // const canInput = channelDetails.allow_members_input || true

  useEffect(() => {
    if (users && users.currentWorkspace) {
      _getSocket(users.currentWorkspace, channelId)
      _getChannelMessages(users.currentWorkspace, channelId)
      _getNotifications(
        users.currentWorkspace,
        channelId,
        users.currentWorkspace
      )
    }
  }, [users])

  const reactToCreateMessageOrJoinOrLeaveChannel = React.useCallback(ctx => {
    dispatch({ type: ADD_CHANNELMESSAGES, payload: ctx.data })
    // notificationsManager(ctx.data.content)
  }, [])

  const chatSidebarConfig = useMemo(
    () => ({
      sendChatMessageHandler: msg => {
        console.log("Message ===", msg)
        _sendMessage(users.currentWorkspace, channelId, {
          user_id: users["0"]._id,
          content: msg.richUiData.blocks[0].text
        })
      },
      currentUserData: {
        username: users["0"]?.user_name || "",
        imageUrl: users["0"]?.image_url || ""
      },
      messages: channelMessages
        ? channelMessages.map(msg => {
            const user = workspaceUsersObject[msg.user_id] || {
              user_name: "",
              image_url: ""
            }
            const formattedTime = instance.formatDate(msg.timestamp, "LT")
            return {
              message_id: msg._id,
              username: user.user_name,
              image_url: user.image_url,
              time: formattedTime,
              emojis: [
                // { name: 'smiling', count: 4, emoji: '😋' },
                // { name: 'grining', count: 1, emoji: '😊' },
              ],
              event: msg.event,
              richUiData: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: "543og",
                    text: msg.content,
                    type: "unstyled"
                  }
                ],
                entityMap: {}
              }
            }
          })
        : [],
      showChatSideBar: true,
      chatHeader: "Chats"
    }),
    [channelMessages, workspaceUsersObject]
  )

  if (!Centrifugo.isMessageRTCSet) {
    if (sockets && sockets.socket_name) {
      const socketName = sockets.socket_name

      Centrifugo.initForMessage(socketName)
      Centrifugo.addMessageListener(
        "create:message",
        reactToCreateMessageOrJoinOrLeaveChannel
      )
      Centrifugo.addMessageListener(
        "join:channel",
        reactToCreateMessageOrJoinOrLeaveChannel
      )
      Centrifugo.addMessageListener(
        "leave:channel",
        reactToCreateMessageOrJoinOrLeaveChannel
      )
      Centrifugo.addMessageListener("update:message", ctx => {
        dispatch({ type: UPDATE_CHANNELMESSAGES, payload: ctx.data })
      })
      Centrifugo.addMessageListener("delete:message", ctx => {
        dispatch({ type: DELETE_CHANNELMESSAGES, payload: ctx.data })
      })
    }
  }

  return (
    // <Flex>
    //   <MessageBoard />
    // </>
    <Flex direction="column" bg="#F9F9F9" width="100%" height="100%">
      {/* <Flex> */}
      {/* <Box width="100%"> */}
      <ChannelHeader
        channelId={channelId}
        org_id={users ? users.currentWorkspace : null}
      />
      <Box flex="1" overflowY="auto">
        {workspaceUsersObject && channelMessages && (
          <MessageBoard chatsConfig={chatSidebarConfig} />
        )}
      </Box>

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
      {/* </Box> */}
      {/* <Box>
          <Thread/>
        </Box> */}
      {/* </Flex> */}
    </Flex>
  )
}

export default MessageBoardIndex
