import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/layout'
import { FaCaretDown } from "react-icons/fa";

import MessageCard from '../MessageCard/MessageCard'

const messages = [
    {name: "Dan Abrahmov", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/dan-abramov" ,index: 1, isThread: false},
    {name: "Deyrin Cutting", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/code-beast" , index: 1, isThread: true},
    {name: "Kelvin monument", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/ryan-florence" , index: 1, isThread: true},
    {name: "Dan Abrahmov", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/dan-abramov" , index: 1, isThread: false}
]

const MessageCardContainer = () =>{
    return(
        <Box>
            <Flex borderRadius="15px" p="4px 6px" flexDir="row" justifyContent="center" alignItems="center" gridGap="4px">
                <Text textAlign="center" >Yesterday </Text> <FaCaretDown />
            </Flex>
            <Box>
            {
                messages.map((message) => {
                    return(
                    <MessageCard {...message} />
                    )
                })
            }
            </Box>
        </Box>    
    )
}

export default MessageCardContainer;