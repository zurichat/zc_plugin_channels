import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Text, useDisclosure, Checkbox, Box, Flex
} from "@chakra-ui/react"
import { FaHashtag } from "react-icons/fa";

function LeaveChannel() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button color="red" fontSize="xs" variant="link" onClick={onOpen}>Leave Channel</Button>

            <Modal isOpen={isOpen} onClose={onClose} colorScheme="none">
                <ModalOverlay bg='#00000060' />
                <ModalContent bg='white' p='32px' w='90%' maxW="604px" minH="245px" m="auto">
                    <ModalHeader
                        display='flex' alignItems='center' justifyContent='space-between'
                        backgroundColor="#fff" p='0'
                        color="#000">
                        <Flex alignItems='center' m='0' p='0'>
                            <Text fontSize="34px" m='0' p='0' color="#000">
                                Leave
                            </Text>
                            <Box pl={2} m='0'>
                                <FaHashtag
                                    color="#000"
                                    fontSize="1.4em"
                                    width="18px"
                                    height="32"
                                    display="inline-block"
                                />
                            </Box>
                            <Text fontSize="34px" m='0' p='0' color="#000">
                                Announcement
                            </Text>
                        </Flex>
                        <ModalCloseButton
                            position="relative"
                            cursor='pointer'
                            p='3px' bg='none'
                            fontSize='14px' border='none'
                            b='none'
                            outline="none"
                        />
                    </ModalHeader>

                    <ModalBody p='0' mt="20px">
                        <Text color='#616061' fontSize='18px' maxW='528px' mb='0.5'> Channel members won’t be notified that you’ve left. You can rejoin anytime</Text>
                    </ModalBody>

                    <ModalFooter p='0'>
                        <Flex w='100%' display='flex' flexWrap='wrap' justifyContent='space-between'>
                            <Box mt="20px" alignItems='center' display="flex">
                                <Checkbox  w='18px' height='18px' b="3px solid #1D1C1D" borderRadius='3px' isInvalid></Checkbox>
                                <Text m='0' ml='13px' fontSize='18px' color='#8B8B8B'>Don’t show this again</Text>
                            </Box>

                            <Box mt="20px">
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
