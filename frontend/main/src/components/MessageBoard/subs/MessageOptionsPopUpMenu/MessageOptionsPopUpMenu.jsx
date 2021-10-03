import React from 'react';
import { Box, HStack, Text} from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons';


function MessageOptionsPopUpMenu() {
    return (
        <Box bg="white" margin="auto" color="black" boxSize="sm" maxW="280px" h="max-content" paddingBlock={3} border={1} boxShadow="md" borderRadius="6px">
            <Box paddingInline={2}>
                Turn off notifications for replies
            </Box>
            <hr />

            <Box>
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

            <Box>
                <Text paddingInline={2}>Send reply to this channel</Text>
                <HStack justifyContent="space-between" p={2}>
                    <Text>Share message</Text>
                    <Text fw="bold">S</Text>
                </HStack>
                <Box paddingInline={2}>Copy link</Box>
            </Box>
            <hr />


            <HStack justifyContent="space-between" p={2}>
                <Text>Pin to Channel</Text>
                <Text>P</Text>
            </HStack>
            <hr />


            <HStack justifyContent="space-between" p={2}>
                <Text>Edit message</Text>
                <Text>E</Text>
            </HStack>

            <HStack as="button" bg="red" color="white" width="100%" d="flex" justifyContent="space-between" p={2}>
                <Text>Delete message</Text>
                <Text>delete</Text>
            </HStack>
        </Box>
    );
}

export default MessageOptionsPopUpMenu;