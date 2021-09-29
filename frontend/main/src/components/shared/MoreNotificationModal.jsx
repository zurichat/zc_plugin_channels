import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { Text, VStack, Link, Button } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";

const MoreNotificationModal = ({onClose, isOpen}) => {
  
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Notifications</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="#8B8B8B" marginBottom="0.5rem">Set notifications for</Text>
          <RadioGroup defaultValue="1">
            <VStack alignItems="flex-start" >
              <Radio colorScheme="green" value="1">
                All new messages
              </Radio>
              <Radio colorScheme="green" value="2">
                Mentions
              </Radio>
              <Radio colorScheme="green" value="3">
                Nothing
              </Radio>
            </VStack>
          </RadioGroup>
          <VStack alignItems="flex-start">
            <Checkbox py="1.5rem" colorScheme="green">
              Use different settings
            </Checkbox>
            <Checkbox colorScheme="green">
              Mute channel
            </Checkbox>
            <Text color="#8B8B8B" paddingLeft="1.5rem" paddingBottom="2rem">
                Muted channels are greyed out at the bottom of your channel list.
                You’ll still see a badge in the sidebar if you’ve been mentioned.
            </Text>
          </VStack>
          <Text color="#8B8B8B">
            Note: You can set notification keywords and change your workspace-wide settings in your <Link href="#" color="blue.500" fontWeight="semibold">Preference.</Link>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            width="135px"
            color="#00B87C"
            backgroundColor="#ffffff"
            border="1px solid #00B87C"
            borderRadius="4px"
            variant="solid"
            fontSize="15px"
            fontWeight="400"
            mr="10px"
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
            >
              Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MoreNotificationModal;
