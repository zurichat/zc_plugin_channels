import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/react'

const MessageInput = () => {
  return (
    <Box
        position='absolute'
        left='10px'
        right='10px'
        bottom='22px'
        border='1px solid #EBEBEB'
        bg='white'
    > 
        <Input height='54px' border='none' placeholder='Send a message to John' paddingBlock='18px' paddingInline='19px' _focus={{ border: 'none' }} />
        <Box>
            
        </Box>
    </Box>
  )
}

export default MessageInput