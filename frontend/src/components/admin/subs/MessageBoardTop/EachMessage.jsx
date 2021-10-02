import React from 'react'
import { VStack, Box, Text, HStack } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'

function EachMessage({ userName, src, messageTime, messageContent }) {
  return (
    <HStack alignItems='flex-start' mb='0.7rem' spacing={4}>
      <Avatar src={src} name={userName} size='sm' />
      <VStack alignItems='flex-start'>
        <HStack>
          <Text fontWeight='bold'>{userName}</Text>
          <Text color='gray.500' fontSize='sm'>
            {messageTime}
          </Text>
        </HStack>
        <Text color='gray.600' textAlign='left'>
          {messageContent}
        </Text>
      </VStack>
    </HStack>
  )
}

export default EachMessage
