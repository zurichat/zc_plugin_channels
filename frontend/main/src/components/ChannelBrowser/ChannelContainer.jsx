import React, { useState } from 'react'
import { FiHash } from 'react-icons/fi'
import { GiPlainCircle } from 'react-icons/gi'
import { Box, Flex, Heading, HStack, Text} from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Link } from 'react-router-dom'

const ChannelContainer = (props) => {
    const [open, setOpen] = useState(false)

    return (
        <Box
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              p={4}
              textAlign="left"
              _hover={{ background: "#F9F9F9", }}
            >
              <HStack spacing="auto">
                <Box className="MenuOpt">
                  <Heading size="md" fontSize="18px" fontWeight={600} textTransform="capitalize" >
                    <Icon as={FiHash} h={4} w={4}  />
                    {props.chan.name}
                  </Heading>
                  <Flex justifyContent="flex-start" alignItems="center" mt={2}>
                    <Text color="#A1A1A1" fontSize="12px" mr={4}>
                      {props.chan.members} Members
                    </Text>
                    <GiPlainCircle fontSize="2px" />

                    <Text color="#A1A1A1" fontSize="12px" ml={4}>
                      {props.chan.description}
                    </Text>
                  </Flex>
                </Box>
                {open && 
                  <Box bgColor="unset" border="0" boxShadow="none"  sx={{ position: "relative", top: 0 }} >
                    <HStack p={2}>
                      <Button width="147px" bgColor="unset" border="1px solid #00B87C" color="#00B87C" borderRadius="0" _hover={{ bg: "#ebedf0" }}>
                       <Link to={"/message-board/"+props.chan._id}> View</Link>
                      </Button>
                      <Button width="147px" bgColor="#00B87C" color="white" borderRadius="0"  _hover={{ bg: "#007A5A" }}>
                        Join
                      </Button>
                    </HStack>
                  </Box>}
              </HStack>
            </Box>
    )
}

export default ChannelContainer
