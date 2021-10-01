import React, {useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text
} from '@chakra-ui/react';
import { VStack, Button } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";


const MoreNotificationModal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [checked, setChecked] = useState("");

  const handleChange = (e) => {
    setChecked(e.target.checked)
    console.log(e);
  }
  
  return (
    <>
    <Text onClick={onOpen}>Open Modal</Text>
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Send a notification for</ModalHeader>
        <ModalCloseButton />
        <ModalBody>          
          <VStack alignItems="flex-start">
            <Checkbox paddingTop="1rem" colorScheme="green" onChange={handleChange}>
              All messages
            </Checkbox>
            <Checkbox colorScheme="green" paddingTop="1rem" onChange={handleChange}>
              Mentions
            </Checkbox>
            <Checkbox colorScheme="green" paddingTop="1rem" onChange={handleChange}>
              Mute Channel
            </Checkbox>
          </VStack>
          
        </ModalBody>
        <ModalFooter>
          <Button
            color="#FF0000"
            backgroundColor="transparent"
            border="1px solid #FF0000"
            borderRadius="4px"
            variant="solid"
            fontSize="15px"
            fontWeight="400"
            mr="10px"
            _hover={{ 
              color: "#FF0000",
              backgroundColor:"transparent"
             }}
          >
            Cancel
          </Button>
          <Button
              width="135px"
              color="#ffffff"
              backgroundColor="#00B87C"
              border="1px solid #00B87C"
              borderRadius="4px"
              variant="solid"
              fontSize="15px"
              fontWeight="400"
              _hover={{ 
                color: "#ffffff",
                backgroundColor:"00B87C"
              }}
              disabled={!checked}
            >
              Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}

export default MoreNotificationModal;
