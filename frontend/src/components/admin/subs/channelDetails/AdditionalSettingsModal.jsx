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
import { Box, Flex } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";

const AdditionalSettingsModal = ({ isOpen, onClose }) => {
  return (
    <Modal size="xl" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent p="40px">
        <ModalHeader p="0">
            <Text>Additional Settings</Text>
            <Text color="#8B8B8B" fontSize="16px" fontWeight="normal" mt=".8rem">Adjust your notifications, alerts, and message alert settings here.</Text>
        </ModalHeader>
        <ModalCloseButton right="40px" top="40px" />
        <ModalBody p="0">
          <Box mt="1.75rem">
            <Text fontWeight="bold">Archive this channel</Text>
            <Flex mt="10px">
                <Text flex="1" color="#8B8B8B" fontSize="16px" fontWeight="normal">
                    If you don’t think it  will be  used anymore you can archive it
                    (All members will be removed ).  You can retireive it later. 
                </Text>
                <Switch colorScheme="green" ml="3.75rem" />
            </Flex>
          </Box>
          <Box mt="1.75rem">
            <Text fontWeight="bold">Rename this channel</Text>
            <Flex mt="10px">
                <Text flex="1" color="#8B8B8B" fontSize="16px" fontWeight="normal">
                  You can rename your channel any time, but dont do it too  often as it
                  can confuse your members.
                </Text>
            </Flex>
          </Box>
          <Box mt="1.75rem">
            <Flex mt="10px">
              <Text flex="1" fontWeight="bold">Set this  channel to private</Text>
              <Switch colorScheme="green" ml="3.75rem" />
            </Flex>
          </Box>
          <Box mt="1.75rem">
            <Text fontWeight="bold">Delete this channel</Text>
            <Flex mt="10px">
                <Text flex="1" color="#8B8B8B" fontSize="16px" fontWeight="normal">
                  Deleting a channel will permanently remove all of its messages. This cannot be undone.  
                </Text>
                <Button
                  bg="#00B87C"
                  background="#E23434"
                  color="white"
                  mb="4"
                  borderRadius="3px"
                  onClick={onClose}
                  py="0.75rem"
                  px="1.125rem"
                >
                  Delete
                </Button>
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter mt="44px" p="0">
          <Button
            bg="#00B87C"
            color="white"
            mb="4"
            borderRadius="3px"
            onClick={onClose}
            py="0.875rem"
            px="5rem"
          >
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdditionalSettingsModal;
