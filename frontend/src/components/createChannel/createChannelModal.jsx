import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Switch,
} from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { HStack, Text } from "@chakra-ui/layout";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FormHelperText } from "@chakra-ui/form-control";

const CreateChannelModal = ({ onClose, isOpen }) => {
  const initialRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent px="0.5rem" borderRadius="2px">
        <ModalHeader fontSize="20px">Create a Channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="#8B8B8B" mb="1rem">
            Channels are where your team communicates. They’re best when
            organized around a topic — #marketing, for example.
          </Text>

          <FormControl mb="1rem">
            <FormLabel fontWeight="bold">Name</FormLabel>
            <Input
              ref={initialRef}
              borderRadius="2px"
              focusBorderColor="green.200"
            />
          </FormControl>

          <FormControl mb="1.5rem">
            <FormLabel fontWeight="bold">
              <HStack>
                <Text>Description</Text>
                <FormHelperText>(optional)</FormHelperText>
              </HStack>
            </FormLabel>
            <Input borderRadius="2px" focusBorderColor="green.200" />
            <FormHelperText> What is this channel about?</FormHelperText>
          </FormControl>

          <Text as="h5" size="sm" fontSize="16px" fontWeight="bold" mb="0.5rem">
            Make this Channel Private
          </Text>
          <HStack justifyContent="space-between">
            <Text color="#8b8b8b" fontSize="0.9rem">
              When a channel is set to private, <br />
              it can only be viewed or joined by invitation.
            </Text>
            <Switch colorScheme="whatsapp" focusBorderColor="green.400" />
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Link to="/create-channel">
            <Button
              px="2rem"
              py="1.2rem"
              colorScheme="whatsapp"
              borderRadius="md"
              onClick={onClose}
            >
              Create
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateChannelModal;
