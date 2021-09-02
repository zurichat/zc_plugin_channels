import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react'

const Message = (props) => {
  const { username, time } = props

  return (
    <Box d='flex' p={2}>
      <Box pr={4} pt={1}>
        <Image
          borderRadius='full'
          boxSize='36px'
          src='https://images.unsplash.com/photo-1630411996618-02c53a95b141?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNDF8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          alt='user profile picture'
        />
      </Box>
      <Box pl={1}>
        <Flex>
          <Box fontWeight='bold' mr={2} color='rgba(36, 36, 36, 1)'>
            {username}
          </Box>
          <Box fontWeight='light' color='rgba(193, 193, 193, 1)'>
            {time}
          </Box>
        </Flex>
        <Text color='rgba(58, 58, 58, 1)' w='260px'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus nunc arcu ornare iaculis. Volutpat tempus egestas donec pretium.
        </Text>
      </Box>
    </Box>
  )
}

const Messages = () => {
  return (
    <Box w='360px' border='1px solid rgba(180, 180, 180, .5)' borderRadius='3px'>
      <Message username="Samuel Hunter" time='5 mins ago' />
      <Message username="Detty Brymz" time='2 mins ago' />
      <Message username="Ekun Omo" time='1 min ago' />
    </Box>
  )
}

export default Messages