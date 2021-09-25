import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  Text,
  Icon,
  Input,
} from "@chakra-ui/react";
import { FaHashtag } from "react-icons/fa";
import { Box } from "@chakra-ui/layout";

const AddPeopleModal = ({ isOpen, onClose }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box>
            Add People
            <Text fontSize="14px" color="#8B8B8B">
              <Icon as={FaHashtag} marginRight="3px" />
              announcements
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Input
            placeholder="Enter a name, email or user group"
            borderRadius="sm"
            color="#8B8B8B"
            size="lg"
            focusBorderColor="green.200"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="whatsapp"
            mb="4"
            borderRadius="3px"
            onClick={onClose}
            px="2rem"
            py="1rem"
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPeopleModal;
