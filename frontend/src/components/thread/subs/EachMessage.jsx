import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react'
const reply = {
  name: "Sammy Hunter",
  time: "10:30 am",
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.",
  avatar: "https://bit.ly/dan-abramov",
  votes: 20
}
const Reply = () => {
  const { name, time, message, avatar, votes } = reply

  return (
    <Box p={3} w='360px' border='1px solid rgba(180, 180, 180, .5)' borderRadius='3px'>
      <Box d='flex'>
        <Box pr={4} pt={1}>
          <Image
            borderRadius='full'
            boxSize='36px'
            src={avatar}
            alt='user profile picture'
          />
        </Box>
        <Box pl={1}>
          <Flex>
            <Box fontWeight='bold' mr={2} color='rgba(36, 36, 36, 1)'>
              {name}
            </Box>
            <Box fontWeight='light' color='rgba(193, 193, 193, 1)'>
              {time}
            </Box>
          </Flex>
          <Text color='rgba(58, 58, 58, 1)' w='265px'>
            {message}
          </Text>
        </Box>
      </Box>
      <Box fontWeight='light' color='rgba(193, 193, 193, 1)'>
              {votes} votes
      </Box>
    </Box>
  )
}

export default Reply