import React from 'react'
import { Avatar, Flex, Spacer, Text } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { BiChevronDown,BiUserPlus } from 'react-icons/bi'
import { Box } from '@chakra-ui/layout'

const TopBar = () => {
    return (
        <Box bg='white' p={4} color='black' borderRadius='2px'>
        <Flex cursor='pointer' alignItems='center'>
          <Heading as='h5' size='sm' fontWeight='semibold'>
            # Announcements
          </Heading>
          <BiChevronDown />
          <Spacer />
          <Flex alignItems="center" width="8rem">
            <Box mr="11px">
              <Avatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" boxSize="36px" />
            </Box>
            <Text mr="11px" color="black" fontWeight="bolder"> 1 </Text>
            <BiUserPlus color="black" size="1.5rem"/>
          </Flex>
          
        </Flex>
    </Box>
    )
}

export default TopBar;
