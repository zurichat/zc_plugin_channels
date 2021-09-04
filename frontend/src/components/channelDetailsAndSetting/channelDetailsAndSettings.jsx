import { Header, Tabs, TabPanels, TabPanel, ModalBody, ModalCloseButton, useDisclosure, Flex, Spacer } from '@chakra-ui/react'
import { Box, Button, Stack, Modal, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'
import TabsRows from './TabsRow'
import { FaVideo } from 'react-icons/fa';
import { FaRegBell } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { FaHashtag } from 'react-icons/fa';

import OrganisationMembersList from './organisationMembersList';
import About from './about';
import FileList from './fileList';

import React from 'react'

const ChannelDetails = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    return (
        <>
        {/* <Button onClick={onOpen}size="sm" bg="#00b87c" color="white" pt="2" pb="2" fontSize="14px">View Channel Details</Button> */}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={onOpen}
          onClose={onClose}
          size="lg"
        >
          <ModalOverlay />
          <ModalContent p={0} mt="8rem" maxW="590px" height="882px">
          <Tabs>
          
            <ModalHeader pt={4} pb={2} backgroundColor='#00AD75' color='#fff' height="178px">
            <Box px={6}>
              <Flex>
                <Box pe={2}>
                  <FaHashtag color="white" fontSize="1.2em" width="18px" height="32" display="inline-block"/>
                </Box>
                <Text fontSize="20px" pb={2} mb={2} color='#fff'>Announcement</Text> 
                <Box ps={2}>
                  <FaRegStar color="white" fontSize="1.2em" width="18px" height="32.4px" display="inline-block"/>
                </Box>
                <Spacer />
                <ModalCloseButton color='#fff' border="1px" borderColor="#fff"/>
              </Flex>
              <Stack direction="row" my={1} py={2}>
                <Box>
                    <Button color='#fff' colorScheme="whiteAlpha" variant="outline" mr={2}>
                    <FaRegBell color="white" pe={2}/>Get Notifications for @ mentions<FaChevronDown color="white" />
                    </Button>
                    <Button color='#fff' colorScheme="whiteAlpha" variant="outline" ml={2}>
                    <FaVideo color="white" w={2} />Start Meeting
                    </Button>
                </Box>   
              </Stack>

              <TabsRows />
              </Box>
            </ModalHeader>
            
            <ModalBody height="703px">
            <Box px={6}>
            <TabPanels>
                <TabPanel>
                <OrganisationMembersList/>
                </TabPanel>
                <TabPanel>
                <About />
                <FileList />
                </TabPanel>
                <TabPanel>
                <p>three!</p>
                </TabPanel>
                <TabPanel>
                <p>four!</p>
                </TabPanel>
            </TabPanels>
            </Box>
            </ModalBody>
            </Tabs>
          </ModalContent>
        </Modal>
      </>
    )
}

export default ChannelDetails;