import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Flex, HStack, Spacer, Stack, Textarea } from '@chakra-ui/react'
import { BoldIcon, CopyLinkIcon, HSeparatorIcon, ItalicsIcon, ListIcon, MentionIcon, SendIcon, StrikeIcon } from '../icon'
import { useRef } from 'react'

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
        <ResizableInput height='58px' border='none' fontSize='15px' color='neutral.500' placeholder='Send a message to John' _placeholder={{ color: 'neutral.500' }} paddingBlock='18px' paddingInline='20px' _focus={{ border: 'none' }} />
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

const MAX_HEIGHT = 200
const MIN_HEIGHT = 58

const ResizableInput = ({ onKeyUp=null, onBlur=null, onFocus=null, ...rest }) => {
    const textRef = useRef(null)
    const fitToContent = (maxHeight) => {
        const text = textRef?.current
        if (!text)
            return

        var adjustedHeight = text.clientHeight
        if (!maxHeight || maxHeight > adjustedHeight) {
            adjustedHeight = Math.max(text.scrollHeight, adjustedHeight)
            if (maxHeight)
                adjustedHeight = Math.min(maxHeight, adjustedHeight)
            if (adjustedHeight > text.clientHeight)
                text.style.height = adjustedHeight + "px"
        }
    }
    const keyUpEventHandler = () => {
        if (onKeyUp)
            onKeyUp()
        fitToContent(MAX_HEIGHT)
    }
    const blurEventHandler = () => {
        if (onBlur) 
            onBlur()
        textRef.current.style.height = MIN_HEIGHT + "px"
        textRef.current.scrollTo(0, 0)
    }
    const focusEventHandler = () => {
        if (onFocus)
            onFocus()
        fitToContent(MAX_HEIGHT)
    }
    return (
        <Textarea 
            ref={textRef} 
            {...rest} 
            onKeyUp={keyUpEventHandler} 
            onFocus={focusEventHandler} 
            onBlur={blurEventHandler} 
            resize='none'
            rows="1"
        />
    )
}

export default MessageInput