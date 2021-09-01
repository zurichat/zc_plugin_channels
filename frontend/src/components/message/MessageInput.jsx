import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Flex, HStack, Input, Spacer, Stack, Textarea } from '@chakra-ui/react'
import { BoldIcon, CopyLinkIcon, HSeparatorIcon, ItalicsIcon, ListIcon, MentionIcon, SendIcon, StrikeIcon } from '../icon'

const MessageInput = () => {
  return (
    <Box
        position='absolute'
        left='10px'
        right='10px'
        bottom='22px'
        border='1px solid #EBEBEB'
        bg='white'
        borderRadius='3px'
    > 
        {/* <Input height='54px' border='none' fontSize='15px' placeholder='Send a message to John' _placeholder={{ color: 'neutral.500' }} paddingBlock='18px' paddingInline='20px' _focus={{ border: 'none' }} /> */}
        <Textarea height='54px' border='none' fontSize='15px' placeholder='Send a message to John' _placeholder={{ color: 'neutral.500' }} paddingBlock='18px' paddingInline='20px' _focus={{ border: 'none' }} />
        <Flex paddingTop='5px' paddingBottom='10px' paddingInline='20px'>
            <HStack spacing='5px'>
                <Box><StrikeIcon /></Box>
                <HSeparatorIcon />
                <Box><BoldIcon /></Box>
                <Box><ItalicsIcon /></Box>
                <Box><ListIcon /></Box>
            </HStack>
            <Spacer />
            <Stack direction='row-reverse' spacing='5px'>
                <Box><SendIcon /></Box>
                <Box><CopyLinkIcon /></Box>
                <Box><MentionIcon /></Box>    
            </Stack>
        </Flex>
    </Box>
  )
}


export default MessageInput