import React from 'react'
import { Box, HStack, VStack } from '@chakra-ui/layout'
import MessageBoardTop from './subs/MessageBoardTop/MessageBoardTop'
import MessageInput from './subs/MessageInput'
import ChannelDetails from './subs/channelDetails'
import ChannelNameBanner from './subs/ChannelNameBanner/ChannelNameBanner'

const Admin = () => {
  return (
    <HStack bg='#F9F9F9' h='max' spacing={0}>
      <VStack
        mx='10px'
        flex='3'
        position='relative'
        alignSelf='stretch'
        justifyContent='flex-end'
      >
        <ChannelNameBanner />
        <MessageBoardTop />
        <MessageInput />
      </VStack>
      <Box flex='1'>
        <ChannelDetails />
      </Box>
    </HStack>
  )
}

export default Admin
