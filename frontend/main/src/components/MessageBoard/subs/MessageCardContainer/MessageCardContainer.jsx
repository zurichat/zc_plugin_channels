import React, {useEffect, useState, useMemo} from 'react'
import { Box, Text, Flex} from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FaCaretDown } from "react-icons/fa";
import { useParams } from 'react-router';

//redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from '../../../../redux/actions/app';

// import MessageCard from "../MessageCard/MessageCard";
import MessageCard from '../../../shared/MessageCard';
import EmptyStateComponent from '../../../createChannel/EmptyStateComponent';

//centrifuge
import Centrifuge from 'centrifuge'


const MessageCardContainer = () =>{

  // let socketUrl = "";
            
  // if (window.location.hostname == "127.0.0.1")
  // {
  //   socketUrl = "ws://localhost:8000/connection/websocket";
  // } else {
  //   socketUrl = "wss://realtime.zuri.chat/connection/websocket";
  // }

  // const centrifuge = new Centrifuge(socketUrl);
  // centrifuge.connect();

  // centrifuge.on('connect', function(ctx) {
  //   console.log("connected", ctx);
  // });

  // centrifuge.on('disconnect', function(ctx) {
  //   console.log("disconnected", ctx);
  // });

  // centrifuge.on('publish', (ctx) => {
  //   console.log("A publication has been detected");
  // });

  

const dispatch = useDispatch()
  const { _getChannelMessages, _getSocket } = bindActionCreators(appActions, dispatch)

  const { channelMessages, sockets } = useSelector((state) => state.appReducer)
  console.log(channelMessages, sockets);

  const { channelId } = useParams()

  const loadData = async () => {
    await _getChannelMessages(1, channelId)
    // await _getSocket(1, channelId)
  }

  // centrifuge.subscribe(sockets.socket_name, function(messageCtx) {
  //   console.log(messageCtx);
  // })

  let messageNumber = 10
  let loadedMessages

  loadedMessages = channelMessages && channelMessages.slice(0, messageNumber)
  
  const [ allChannelMessage, setAllChannelMessage ] = useState(loadedMessages) 
  const [moreMessages, setMoreMessages] = useState(false)


  useEffect(async () => {
   loadData()
  }, []);

  let renderedMessages = moreMessages ? allChannelMessage : loadedMessages;
    
    const loadMore = () => {
      if(channelMessages !== []){
        messageNumber += 1
      }
      loadedMessages = channelMessages.slice(0, messageNumber)
      setAllChannelMessage(loadedMessages)
      setMoreMessages(true)
      console.log("loading " + loadedMessages, loadedMessages.length, "message limit= " + messageNumber);
    }

    return(
      <>
      <EmptyStateComponent />
     { channelMessages && channelMessages.length > 0 &&
        <Box>
            <Flex borderRadius="15px" p="4px 6px" flexDir="row" justifyContent="center" alignItems="center" gridGap="4px">
            <Button
        background='#FFFFFF'
        border='1px solid rgba(87, 87, 87, 0.3)'
        borderRadius='15px'
        size='xs'
        mb='10px'
        rightIcon={<FaCaretDown /  >}
      >
        Today
      </Button>
            </Flex>
            
            <Box>
            
            
            { channelMessages && channelMessages.length > 0 &&
                renderedMessages.map((message) => {
                    return(
                      message === [] ? <Text textAlign="center">Loading...</Text> :
                    <MessageCard {...message} key={message._id} />
                    )
                })
            }
            {
              channelMessages.length > 0 ? 
              <Text color="#1264A3" textAlign="center" cursor="pointer" onClick={loadMore}>{channelMessages.length > messageNumber  ? "Load More..." : " "}</Text> :
              null 
            }
            </Box>
        </Box> }
        </>  
    )
}

export default MessageCardContainer;
