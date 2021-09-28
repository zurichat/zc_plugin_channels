import React from 'react';
import { Box, HStack, Text, Button} from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Modal,   
    ModalContent,
    ModalBody,
    useDisclosure,
} from "@chakra-ui/react";

function MessageOptionsPopUpMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent maxW="16rem">
                    <ModalBody bg="white" margin="auto" color="black" width="max-content" boxSize="sm" maxW="270px" h="max-content" paddingBlock={3} boxShadow="md" borderRadius="6px">
             <Box pb={2} borderBottom="1px" borderBottomColor="gray.300">
                Turn off notifications for replies
            </Box>
            <hr />

            <Box borderBottom="1px" borderBottomColor="gray.300">
                <HStack justifyContent="space-between" p={2}>
                    <Text>Mark Unread</Text>
                    <Text fw="bold">U</Text>
                </HStack>
                <HStack justifyContent="space-between" p={2}>
                    <Text>Remind me about this</Text>
                    <ChevronRightIcon />
                </HStack>
            </Box>
            <hr />

            <Box borderBottom="1px" borderBottomColor="gray.300">
                <Text paddingInline={2}>Send reply to this channel</Text>
                <HStack justifyContent="space-between" p={2}>
                    <Text>Share message</Text>
                    <Text fw="bold">S</Text>
                </HStack>
                <Box paddingInline={2}>Copy link</Box>
            </Box>
            <hr />


            <HStack as="button" d="flex" width="100%" justifyContent="space-between" p={2} borderBottom="1px" borderBottomColor="gray.300">
                <Text>Pin to Channel</Text>
                <Text>P</Text>
            </HStack>
            <hr />


            <HStack as="button" d="flex" width="100%" justifyContent="space-between" p={2}>
                <Text>Edit message</Text>
                <Text>E</Text>
            </HStack>

            <HStack as="button" bg="red" color="white" width="100%" d="flex" justifyContent="space-between" p={2}>
                <Text>Delete message</Text>
                <Text>delete</Text>
            </HStack>
            </ModalBody>
                </ModalContent>
            </Modal>
        </>  
    );
}

export default MessageOptionsPopUpMenu;