import React, { useRef } from 'react'
import { Box, Popover, PopoverTrigger, PopoverContent, PopoverBody, Text } from "@chakra-ui/react"
import { Flex, HStack, VStack } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/avatar"
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
                <PopoverBody p="0" border="1px solid #E7E7E7" borderRadius="3px" bg="white" boxShadow="0 6px 30px 0 #a5a5a540">
                    <VStack px="15px" py="17px" spacing="10px" alignItems="flex-start" width="100%" height="350px" maxH="calc(70vh - 40px)" overflowY="auto">
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
    const formattedTime = instance.formatDate(timestamp, 'MMM Do, LT')
    return (
        <Flex p="17px" gridGap="11px" ref={msgRef} bg="#FFFFFF" shadow="0 6px 30px 0 #A5A5A526" border="1px solid #E7E7E733" _focus={{ bg: "#F1FFFA" }} _hover={{ bg: "#F1FFFA" }}>
            <Box>
                <Avatar name={user_id} src={icon} w="25px" h="25px" borderRadius="4px" />
            </Box>
            <VStack>
                <HStack>
                    <Text fontWeight="900" color="#1D1C1D">{ user_id }</Text>
                    <Text fontSize="13px" color="#616061">{formattedTime}</Text>
                </HStack>
                <Text mt="11px" color="#1D1C1D">{ content }</Text>
                {/* Emoji Stuff here */}
            </VStack>
        </Flex>
    )
}

export default PinnedMessages;