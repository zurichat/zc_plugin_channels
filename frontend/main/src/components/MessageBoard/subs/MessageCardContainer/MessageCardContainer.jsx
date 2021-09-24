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


const MessageCardContainer = () =>{

const dispatch = useDispatch()
  const { _getChannelMessages } = bindActionCreators(appActions, dispatch)

  const { channelMessages } = useSelector((state) => state.appReducer)
  console.log(channelMessages);

  const { channelId } = useParams()

  const loadData = async () => {
    await _getChannelMessages(1, channelId)
  }

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
              <Text color="#1264A3" textAlign="center" cursor="pointer" onClick={loadMore}>{channelMessages.length !== 0  ? "Load More..." : " "}</Text> :
              null 
            }
            </Box>
        </Box> }
        </>  
    )
}

export default MessageCardContainer;
