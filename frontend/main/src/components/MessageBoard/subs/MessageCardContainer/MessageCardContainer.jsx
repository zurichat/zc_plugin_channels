import React, {useEffect, useState} from 'react'
import { Box, Text, Flex} from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FaCaretDown } from "react-icons/fa";

//redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from '../../../../redux/actions/app';

// import MessageCard from "../MessageCard/MessageCard";
import MessageCard from '../../../shared/MessageCard';


const MessageCardContainer = () =>{

const dispatch = useDispatch()
  const { _getChannelMessages } = bindActionCreators(appActions, dispatch)

  const { channelMessages } = useSelector((state) => state.appReducer)
  console.log(channelMessages);


  const loadData = async () => {
    await _getChannelMessages(1, "613f70bd6173056af01b4aba")
  }

  let messageNumber = 10

  let loadedMessages = channelMessages.splice(0, messageNumber)

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
      setAllChannelMessage(loadedMessages)
      setMoreMessages(true)
      loadedMessages = channelMessages.splice(0, messageNumber)
      console.log("loading " + loadedMessages, loadedMessages.length, "message limit= " + messageNumber);
    }

    return(
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
            {
                renderedMessages.map((message) => {
                    return(
                      message === [] ? <Text textAlign="center">Loading...</Text> :
                    <MessageCard {...message} key={message._id} />
                    )
                })
            }
            {
              channelMessages !== [] ? 
              <Text color="#1264A3" textAlign="center" cursor="pointer" onClick={loadMore}>{allChannelMessage == [] ? "Loading..." : "Load More..."}</Text> :
              null 
            }
            </Box>
        </Box>    
    )
}

export default MessageCardContainer;
