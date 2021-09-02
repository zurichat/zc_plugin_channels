import React from 'react'
import { Box, HStack } from '@chakra-ui/layout'
import { Flex, Spacer, Avatar, AvatarGroup } from "@chakra-ui/react"
import { FiUserPlus } from "react-icons/fi"
import { Icon } from '@chakra-ui/icon'
import { BsChevronDown, BsHash } from "react-icons/bs";

//avatar details
const avatars = [
    {name: "Ryan Florence" , avi: "https://bit.ly/ryan-florence", index:1},
    {name: "Segun Adebayo", avi: "https://bit.ly/sage-adebayo", index:2},
    {name: "Kent Dodds", avi: "https://bit.ly/kent-c-dodds", index:3},
]

const ChannelDetailsContainer = () => {
    return(
        <Box>
            <Flex align='center' bgColor='#ffffff' height='8vh' boxShadow='xs' w="100%" p={4} letterSpacing="wide">
                <Flex as='button' borderRadius="md" p="4" align='center' color="white" px={4} h={8} mr='2'>
                    <Icon as={BsHash} color='#000000' mr='2' w={5} h={5} />
                    <Box as='span' fontSize="md" color='#000000' fontWeight='bold' mr='2'> Announcements</Box> 
                    <Icon as={BsChevronDown} color="black" w={3} h={6} />
                </Flex>
                <Spacer />
                <Flex p="4">
                    <HStack justifyContent='space-between'>
                        <AvatarGroup size="xs" max={3}>
                            {avatars.map((avatar) => {
                                return(
                                <Avatar size="sm" name={avatar.name} src={avatar.avi} />
                                )
                            })}
                        </AvatarGroup>
                        <Box as='span'>30,000</Box>
                        <FiUserPlus color='#333333'/> 
                    </HStack>
                </Flex>
            </Flex>
        </Box>
        
    )
}
 
export default ChannelDetailsContainer;