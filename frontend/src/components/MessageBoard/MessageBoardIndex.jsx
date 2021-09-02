import React from 'react'
import { Box } from '@chakra-ui/layout'

import ChannelDetailsContainer from './subs/ChannelDetailsContainer/ChannelDetailsContainer'
import MessageCardContainer from './subs/MessageCardContainer/MessageCardContainer'
import InputFieldComponent from './subs/InputFieldComponent/InputFieldComponent'

const MessageBoardIndex = () => {
  return (<Box>
    <ChannelDetailsContainer />
    <MessageCardContainer />
    <InputFieldComponent />
  </Box>)
}

export default MessageBoardIndex
