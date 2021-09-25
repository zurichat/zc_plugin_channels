import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Text, useDisclosure, Container, Checkbox, Box, Spacer, Flex
} from "@chakra-ui/react"
import { FaHashtag } from "react-icons/fa";

function LeaveChannel() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button color="red" fontSize="xs" variant="link" onClick={onOpen}>Leave Channel</Button>

            <Modal isOpen={isOpen} onClose={onClose} colorScheme="none">
                <ModalOverlay bg='#00000060' />
                <ModalContent bg='white' maxW="639px" maxH="234px" m="auto">
                    <ModalHeader  pt={2}
                        pb={2}
                        backgroundColor="#fff"
                        color="#000">
                        <Flex>
                            <Text fontSize="28px" pb={2} mb={2} color="#000">
                                Leave
                            </Text>
                            <Box pl={2} pt={2}>
                                <FaHashtag
                                color="#000"
                                fontSize="1.2em"
                                width="18px"
                                height="32"
                                display="inline-block"
                                />
                            </Box>
                            <Text fontSize="28px" pb={2} mb={2} color="#000">
                                Announcement
                            </Text>
                            <Spacer />
                            <ModalCloseButton
                                color="#000"
                            />
                        </Flex>
                    </ModalHeader>

                    <ModalBody pt={2}>
                        <Text color='#616061' fontSize='18px' maxW='528px' mb='0.5'> Channel members won’t be notified that you’ve left. You can rejoin anytime</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Flex>
                            <Box display="flex">
                                <Checkbox w='18px' height='18px' border='3px solid #1D1C1D' borderRadius='3px' isInvalid></Checkbox>
                                <Text m='0' ml='13px' fontSize='18px' color='#8B8B8B'>Don’t show this again</Text>
                            </Box>
                            <Spacer />
                            <Box>
                                <Button cursor='pointer' h='30px' p='16px 16px' mr='15px' borderRadius='5px' fontSize='16px' color='#00AD75' fontWeight='700' border='2px solid #00AD75' bg='white' onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button cursor='pointer' h='30px' p='18px 16px' border='none' borderRadius='5px' fontSize='16px' color='#fff' fontWeight='700' bg='#00AD75' >Leave Channel</Button>
                            </Box>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default LeaveChannel
