import React, { useRef } from 'react'
import {
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Text
  } from "@chakra-ui/react"
import {
    HStack, VStack
} from "@chakra-ui/layout"
import {
    Avatar
} from "@chakra-ui/avatar"
import { useSelector } from 'react-redux'
import instance from '../../utils/utils'


const PinnedMessages = (props) => {
    const initialRef = useRef()
    const { pinnedMessages } = useSelector((state) => state.channelsReducer)
    return (
        <Popover initialFocusRef={initialRef}>
            <PopoverTrigger>
                { props.children }
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody 
                    p="1rem"
                    spacing="6px"
                    border="1px solid #EBEBEB"
                    borderRadius="3px" 
                    bg="white"
                >
                    <VStack spacing="10px" alignItems="flex-start">
                        {
                            pinnedMessages.map((message, i) => <PinMessageCard key={`pin-message-${i}`} msgRef={i === 1 ? initialRef : null} {...message} />)
                        }
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}


const PinMessageCard = ({ msgRef, user_id, timestamp, content, icon, can_reply, edited, _id  }) => {
    const formattedTime = instance.formatDate(timestamp, 'MMM Do [at] LT')
    return (
        <Box ref={msgRef}>
            <HStack>
                <Avatar name={user_id} src={icon} w="24px" h="24px" borderRadius="4px" />
                <Text>{ user_id }</Text>
            </HStack>
            <Text mt="3px">{ content }</Text>
            <Text fontSize="12px" mt="5px">{formattedTime}</Text>
        </Box>
    )
}

export default PinnedMessages;