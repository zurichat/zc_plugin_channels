import React from 'react'
import { Box, Text, Flex, Divider} from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/react'


export default function fileList() {
    return (
            <Box position='absolute' width='510px' height='343px' left='50px' top='473px'>
                <Flex>
                    <Text position='absolute' width="25px" height='16px' left="73px" top="488px" fontWeight="bold" fontSize="12px">Files</Text>
                    <Flex flexDirection="row">
                        <Box boxSize="sm" width='36px' height='36px' left='73px' top='521px'>
                            <Image src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" />
                        </Box>
                        <Flex>
                            <Text position='absolute' width='55px' height='16px' left='118px' top='525px' fontWeight='bold' fontSize='12px'>Image.png</Text>
                            <Flex flexDirection='column'>
                                <Text p={6}>Kevin</Text>
                                <Text>Aug 25th at 6.30AM</Text>
                            </Flex>
                        </Flex>

                        
                    </Flex>
                </Flex>
                <Divider orientation="horizontal" />



                <Box as="">Show more</Box>

            </Box>
            
    
    )
    
}
{/* <Flex position='absolute' width='25px' height='16px' left='73px' top='488px'> */}
