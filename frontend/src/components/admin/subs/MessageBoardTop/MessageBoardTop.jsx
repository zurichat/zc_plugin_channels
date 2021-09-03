import React from 'react'
import { useMemo } from 'react'
import { Box } from '@chakra-ui/layout'
import EachMessage from './EachMessage'
import { Button } from '@chakra-ui/button'
import { FiChevronDown } from 'react-icons/fi'
import { v4 } from 'uuid'

//DEMO MESSAGES THIS WOULD BE FETCHED LATER FROM THE BACK END TEAM

function MessageBoardTop() {
  const messages = useMemo(
    () => [
      {
        id: v4(),
        avatar:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        userName: 'Deyrin',
        time: '10:30 am',
        message:
          'I need not explain how abibola is a boss lady, while Teoun is naza pro max, charles is prof. charles xavier sorry i meant charles kendrick',
      },
      {
        id: v4(),
        avatar:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        userName: 'Deyrin',
        time: '10:30 am',
        message:
          'I need not explain how abibola is a boss lady, while Teoun is naza pro max, charles is prof. charles xavier sorry i meant charles kendrick',
      },
      {
        id: v4(),
        avatar:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        userName: 'Deyrin',
        time: '10:30 am',
        message:
          'I need not explain how abibola is a boss lady, while Teoun is naza pro max, charles is prof. charles xavier sorry i meant charles kendrick',
      },
      {
        id: v4(),
        avatar:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        userName: 'Deyrin',
        time: '10:30 am',
        message:
          'I need not explain how abibola is a boss lady, while Teoun is naza pro max, charles is prof. charles xavier sorry i meant charles kendrick',
      },
    ],
    [],
  )
  return (
    <Box
      bg='white'
      textAlign='center'
      overflowY='auto'
      p='20px'
      css={{
        '&::-webkit-scrollbar': {
          width: '0',
        },
        '&::-webkit-scrollbar-track': {
          width: '0',
        },
      }}
      borderRadius='md'
    >
      <Button
        background='#FFFFFF'
        border='1px solid rgba(87, 87, 87, 0.3)'
        borderRadius='15px'
        size='xs'
        mb='10px'
        rightIcon={<FiChevronDown />}
      >
        Yesterday
      </Button>
      <Box>
        {messages.map(message => (
          <EachMessage
            userName={message.userName}
            messageTime={message.time}
            src={message.avatar}
            messageContent={message.message}
          />
        ))}
      </Box>
    </Box>
  )
}

export default MessageBoardTop
