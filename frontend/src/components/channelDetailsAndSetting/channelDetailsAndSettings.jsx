import {
  Tabs,
  TabPanels,
  TabPanel,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  Stack,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import TabsRows from "./TabsRow";
import { FaVideo } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";

import OrganisationMembersList from "./organisationMembersList";
import About from "./about";
import FileList from "./fileList";

import React from "react";


const ChannelDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
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
          <Tabs colorScheme="#fff">
            <ModalHeader
              pt={3}
              pb={2}
              backgroundColor="#00AD75"
              color="#fff"
              height="178px"
            >
              
              <Box px={6}>
                <Flex>
                  <Box pe={2} pt={1.5}>
                    <FaHashtag
                      color="#ffffff"
                      fontSize="1.2em"
                      width="18px"
                      height="32"
                      display="inline-block"
                    />
                  </Box>
                  <Text fontSize="20px" pb={2} mb={2} color="#ffffff">
                    Announcement
                  </Text>
                  <Box ps={2} pt={1.5}>
                    <FaRegStar
                      color="#ffffff"
                      fontSize="1.2em"
                      width="18px"
                      height="32.4px"
                      display="inline-block"
                    />
                  </Box>
                  <Spacer />
                  <ModalCloseButton
                    color="#ffffff"
                  />
                </Flex>
                <Stack direction="row" my={1} py={2}>
                  <Box>
                    <Button
                      color="#ffffff"
                      colorScheme="whiteAlpha"
                      variant="outline"
                      mr={2}
                    >
                      <Box mr={2} mt={1}>
                        <FaRegBell color="#ffffff" mr={6} />
                      </Box>
                      <Text color='#ffffff'>Get Notifications for @ mentions</Text>
                      <Box ml={2} mt={1}>
                        <FaChevronDown color="#ffffff" mt={4} ml={5} />
                      </Box>
                    </Button>
                    <Button
                      color="#ffffff"
                      colorScheme="whiteAlpha"
                      variant="outline"
                      ml={2}
                    >
                      <Box mr={2} mt={1}>
                        <FaVideo color="#ffffff" w={2} />
                      </Box>
                      <Text color='#ffffff'>Start Meeting</Text>
                    </Button>
                  </Box>
                </Stack>

                <Box w={400}>
                  <TabsRows colorScheme="white"/>
                </Box>
              </Box>
            </ModalHeader>

            <ModalBody height="703px">
              <Box px={6}>
                <TabPanels>
                  <TabPanel>
                  <About  />
                  <FileList />
                  </TabPanel>
                  <TabPanel>
                  <OrganisationMembersList />
                  </TabPanel>
                  <TabPanel>
                  </TabPanel>
                  <TabPanel>
                  </TabPanel>
                </TabPanels>
              </Box>
            </ModalBody>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChannelDetails;
