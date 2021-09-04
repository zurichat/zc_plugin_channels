import React from 'react'
import { Box } from '@chakra-ui/layout'

import ChannelDetailsContainer from './subs/ChannelDetailsContainer/ChannelDetailsContainer'
import MessageCardContainer from './subs/MessageCardContainer/MessageCardContainer'
import InputFieldComponent from './subs/InputFieldComponent/InputFieldComponent'
import { createBreakpoints } from "@chakra-ui/theme-tools"
// This is the default breakpoint
const breakpoints = createBreakpoints({
  sm: "90vh",
  md: "85vh",
  lg: "75vh",
  xl: "80vh",
  "2xl": "80vh"
})

const MessageBoardIndex = () => {
  return (
    <Box>
      <ChannelDetailsContainer />
      <Box overflowY="scroll" height={["75vh","79vh", "80vh", "75vh"]}>
        <MessageCardContainer />
      </Box>
      <InputFieldComponent />
    </Box>
  )
}

export default MessageBoardIndex
