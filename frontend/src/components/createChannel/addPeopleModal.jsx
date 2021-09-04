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
  useDisclosure,
  Text,
  Icon,
  Input,
} from "@chakra-ui/react";
import { FaHashtag } from "react-icons/fa";

const AddPeopleModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        bg="#e5e5e5"
        color="black"
        pt="2"
        pb="2"
        fontSize="14px"
      >
        Add Members
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent p={2} w="40rem" mt="10rem" borderRadius="4px">
          <ModalHeader>
            Add People
            <br />
            <Text fontSize="14px" color="#8B8B8B">
              <Icon as={FaHashtag} marginRight="3px" />
              announcements
            </Text>
          </ModalHeader>
          <ModalCloseButton onFocus="" mt="0.8rem" mr=".7rem" color="#8B8B8B" />

          <ModalBody>
            <Input
              ref={initialRef}
              height="3.2rem"
              placeholder="Enter a name, email or user group"
              borderRadius="10px"
              border="1px"
              color="#8B8B8B"
              borderColor="8C8C8C"
              focusBorderColor="green.200"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              backgroundColor="#C1C1C1"
              _hover={{ bg: "#00B87C", color: "white" }}
              pt={4}
              pb={4}
              width="8rem"
              mb="4"
              borderRadius="3px"
              onClick={onClose}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPeopleModal;
