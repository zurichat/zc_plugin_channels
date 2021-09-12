import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Form, FormControl } from '@chakra-ui/form-control';
import { Button } from '@chakra-ui/button';

const dummyChannel = { name: "Announcement" }
const AddPeopleModal = ({ visible=false, toChannel=dummyChannel, onClose }) => {
    return (
        <Modal isOpen={visible} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text>Add People</Text>
                    <Text fontSize="16px" fontWeight="normal"># { toChannel.name }</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Form>
                <FormControl id="user">
                    <Input type="text" placeholder="Enter a name, email or user group" />
                </FormControl>
                <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={false}
                    type="submit">Submit</Button>
                </Form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddPeopleModal;