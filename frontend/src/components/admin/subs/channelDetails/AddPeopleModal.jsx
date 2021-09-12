import React, { useState } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { FormControl } from '@chakra-ui/form-control';
import { Button } from '@chakra-ui/button';
import { FiHash } from 'react-icons/fi';
import { Avatar } from '@chakra-ui/avatar';
import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/tag';

const dummyChannel = { name: "Announcement" }
const dummyUserlist = [
    { id: 1, nickname: "AgboolaThomas", name: "Agboola Thomas", isOnline: true, alreadyInThisChannel: false },
    { id: 2, nickname: "AgboolaThomas", name: "Agboola Thomas", isOnline: true, alreadyInThisChannel: false  },
    { id: 3, nickname: "Agory01", name: "Glory Adabanjo", isOnline: false, alreadyInThisChannel: false },
    { id: 4, nickname: "AgboolaThomas", name: "Agboola Thomas", isOnline: true, alreadyInThisChannel: true },
    { id: 5, nickname: "AgboolaThomas", name: "Agboola Thomas", isOnline: true, alreadyInThisChannel: false },
    { id: 6, nickname: "AgboolaThomas", name: "Agboola Thomas", isOnline: false, alreadyInThisChannel: false },
];

const AddPeopleModal = ({ visible=false, toChannel=dummyChannel, onClose }) => {
    const [ showMenu, setMenuVisiblity ] = useState(false);
    return (
        <Modal isOpen={visible} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent px="2rem" py="2.5rem">
                <ModalHeader p={0}>
                    <Box>
                        <Text>Add People</Text>
                        <HStack color="#8C8C8C" alignItems="center" fontSize="16px" fontWeight="normal" spacing="3px">
                            <FiHash />  <Text>{ toChannel.name }</Text>
                        </HStack>
                    </Box>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody mt="2.5rem" p={0}>
                    <Flex borderRadius="5px" py="17px" px="22px" borderWidth="1px" borderColor="#2B2B2B" bg="white" overflow="hidden">
                        <Tag size="lg" bg="#C4F9E8" borderRadius="4px" pr="15px" px="0">
                            <HStack spacing="6px">
                                <Avatar
                                    src="https://th.bing.com/th/id/OIP.he0A0HY8TvZfJXTEgwnWbwAAAA?pid=ImgDet&w=100&h=100&c=7"
                                    h="40px"
                                    w="40px"
                                    name="Agboola Thomas"
                                    borderRadius="4px"
                                />
                                <TagLabel fontSize="14px">AgboolaThomas</TagLabel>
                                <TagCloseButton />
                            </HStack>
                        </Tag>
                        <Input 
                            type="text" 
                            placeholder="Enter a name, email or user group"
                            flex="1"
                            minW="200px"
                            color="black"
                            border="none"
                            _placeholder={{ color: "#8B8B8B" }}
                            _focus={{ outline: 'none' }}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter mt="2rem" p={0}>
                    <HStack direction="row-reverse">
                        <Button 
                            bg="#DDDDDD"
                            borderRadius="5px"
                            px="3.25rem"
                            py="0.75rem"
                        >Add</Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddPeopleModal;