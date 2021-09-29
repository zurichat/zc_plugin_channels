import React, {useEffect, useState, useMemo} from 'react'
import { Box, Text, Flex} from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FaCaretDown } from "react-icons/fa";
import { useParams } from 'react-router';
import { useHistory } from 'react-router';

import APIService from "../../../../utils/api";

//redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from '../../../../redux/actions/app';

// import MessageCard from "../MessageCard/MessageCard";
import MessageCard from '../../../shared/MessageCard';
import EmptyStateComponent from '../../../createChannel/EmptyStateComponent';

//centrifuge
import Centrifuge from 'centrifuge'
import { GET_RENDEREDMESSAGES } from '../../../../redux/actions/types';


const MessageCardContainer = () =>{

  const dispatch = useDispatch()
  const history = useHistory()
  const { _getChannelMessages, _getSocket } = bindActionCreators(appActions, dispatch)
  const { channelMessages, sockets, renderedMessages, users } = useSelector((state) => state.appReducer)
  //console.log(channelMessages, sockets);

  const { channelId } = useParams()


  const [ allChannelMessage, setAllChannelMessage ] = useState() 
  const [moreMessages, setMoreMessages] = useState(false)

  const noOfMessages= 20;
  
  let loadedMessages;
  let messageStartingIndex;
  let messageEndIndex;


  useEffect( () => {
      const loadData = async ()=> {
        // history.push(`/message-board/${channelId}`)
        // console.log('\n\n\nabout to fetch')
        const res = await APIService.getMessages("614679ee1a5607b13c00bcb7", channelId);
        // console.log("614679ee1a5607b13c00bcb7");
        const receivedMessages = res.data.data
        messageEndIndex = receivedMessages.length
        messageStartingIndex = messageEndIndex > noOfMessages ? channelMessages.length - noOfMessages : 0

        loadedMessages = receivedMessages && receivedMessages.slice(messageStartingIndex, messageEndIndex)
        _getChannelMessages("614679ee1a5607b13c00bcb7", channelId)
        dispatch({ type: GET_RENDEREDMESSAGES, payload: loadedMessages })
      }
      loadData()
}, [channelId]);

  // let renderedMessages = moreMessages ? allChannelMessage : loadedMessages;
    
    const loadMore = () => {
      if(channelMessages !== []){
        messageStartingIndex += 1
      }
      loadedMessages = channelMessages.slice(messageStartingIndex, channelMessages.length)
      setAllChannelMessage(loadedMessages)
      setMoreMessages(true)
      console.log("loading " + loadedMessages, loadedMessages.length, "message limit= " + messageStartingIndex);
    }
   
    

      // dispatch({ type: GET_RENDEREDMESSAGES, payload: loadedMessages })
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
            
            
            { renderedMessages && renderedMessages.length > 0 &&
                renderedMessages.map((message) => {
                    return(
                      message === [] ? <Text textAlign="center">Loading...</Text> :
                    <MessageCard {...message} key={message._id} />
                    )
                })
            }
            {
              channelMessages.length > 0 ? 
              <Text color="#1264A3" textAlign="center" cursor="pointer" onClick={loadMore}>{channelMessages.length > messageStartingIndex  ? "Load More..." : " "}</Text> :
              null 
            }
            </Box>
        </Box> }
        </>  
    )
}

export default MessageCardContainer;
