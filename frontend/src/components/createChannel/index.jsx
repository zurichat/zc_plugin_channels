import React from 'react'
import { Box } from '@chakra-ui/layout'
import MessageInput from './MessageInput'
import TopBar from './TopBar'
import ChannelBody from './ChannelBody'


const CreateChannel = () => {
  return (  
  <Box width='100%' height='100vh' bg='#E5E5E5' pos="relative" display="flex" flexDir="column">
    <Box p={6} mb={6}>
      <TopBar />
      <ChannelBody />
      <MessageInput />
    </Box>
  </Box>)
}

export default CreateChannel
