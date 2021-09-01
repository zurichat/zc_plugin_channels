import React from 'react'
import { Box } from '@chakra-ui/layout'
import { Flex, HStack, Spacer, Stack, Textarea } from '@chakra-ui/react'
import { BoldIcon, CopyLinkIcon, HSeparatorIcon, ItalicsIcon, ListIcon, MentionIcon, SendIcon, StrikeIcon } from '../icon'
import { useRef } from 'react'

/**
 * Message Input position itself at the bottom is its 'relative'ly position parent element.
 * @todo Markdown not yet functional
 * @returns React FC
 */
const MessageInput = () => {
    const textRef = useRef(null)
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
            <ResizableInput textareaRef={textRef} height='58px' border='none' fontSize='15px' color='neutral.500' placeholder='Send a message to John' _placeholder={{ color: 'neutral.500' }} paddingBlock='18px' paddingInline='20px' _focus={{ border: 'none' }} />
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

const ResizableInput = ({ textareaRef, onKeyUp=null, onBlur=null, onFocus=null, ...rest }) => {
    const fitToContent = (maxHeight) => {
        const text = textareaRef?.current
        if (!text)
            return

        var adjustedHeight = text.clientHeight
        if (!maxHeight || maxHeight > adjustedHeight) {
            adjustedHeight = Math.max(text.scrollHeight, adjustedHeight)
            if (maxHeight)
                adjustedHeight = Math.min(maxHeight, adjustedHeight)
            if (adjustedHeight === maxHeight)
                textareaRef.current.style.overflowY = 'auto'
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
        textareaRef.current.style.height = MIN_HEIGHT + "px"
        textareaRef.current.scrollTo(0, 0)
        textareaRef.current.style.overflowY = 'hidden'
    }
    const focusEventHandler = () => {
        if (onFocus)
            onFocus()
        fitToContent(MAX_HEIGHT)
    }
    return (
        <Textarea 
            ref={textareaRef} 
            {...rest} 
            onKeyUp={keyUpEventHandler} 
            onFocus={focusEventHandler} 
            onBlur={blurEventHandler} 
            resize='none'
            rows='1'
            overflowY='hidden'
        />
    )
}

export default MessageInput