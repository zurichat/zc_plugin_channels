import React from 'react'
import { Box, Flex, Text, Link } from '@chakra-ui/layout'
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"

const replies = [
    {name: "Dan Abramov", profilePic: "https://bit.ly/dan-abramov", index: 1},
    {name: "Dan Abramov", profilePic: "https://bit.ly/code-beast", index: 2},
    {name: "Dan Abramov", profilePic: "https://bit.ly/ryan-florence", index: 3},
    {name: "Dan Abramov", profilePic: "https://bit.ly/prosper-baba", index: 4},
    {name: "Dan Abramov", profilePic: "https://bit.ly/sage-adebayo", index: 5}
]

// const isThread = false;

const MessageCard = ({ name, time, message, icon, isThread }) =>{
    return(
        <Box>
            <Flex flexWrap="nowrap" flexDir="row" p="15px" gridGap="15px">
                <Box>
                    <Avatar name="Dan Abrahmov" src={icon} />
                </Box>
                <Flex flexDir="column" gridGap="5px">
                    <Flex flexWrap="nowrap" flexDir="row" gridGap="10px">
                        <Text fontSize="15px" fontWeight="bold">{name}</Text>
                        <Text fontSize="15px" fontWeight="400" color="#8B8B8B">{time}</Text>
                    </Flex>
                    <Box m="0px">
                        <Text pr="40px">
                        {message}
                        </Text>
                    </Box>
                    {isThread &&
                        <Flex p="15px" flexDirection="row" gridGap="15px" alignItems="center">
                        <AvatarGroup>
                        {replies.map((reply) => {
                            return(
                            <Avatar size="sm" name={reply.name} src={reply.profilePic} />
                            )
                        })}
                        </AvatarGroup>
                        <Link color="#0562ED">20 Replies</Link>
                        <Text color="#8B8B8B">Last reply 2 hours ago</Text>
                    </Flex>}
                </Flex>   
            </Flex>
        </Box>
    )
}

export default MessageCard;