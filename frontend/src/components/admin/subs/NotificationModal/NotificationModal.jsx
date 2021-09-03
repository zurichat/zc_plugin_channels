import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Switch,
  HStack,
  Select,
} from '@chakra-ui/react'

const NotificationModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notification Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize='0.9rem' color='gray.500'>
            Adjust your notifications, alerts, and message alert settings here.
          </Text>
          <Text color='gray.700' fontWeight='semibold' mt='20px'>
            Mute this channel
          </Text>

          <HStack mb='55px' justifyContent='space-between'>
            <Text fontSize='0.9rem' color='gray.500' w='80%'>
              When a channel is set to mute, you will not be able to see unread
              unless it is mentioned.
            </Text>

            <Switch mt='5px' id='muteChannel' colorScheme='blackAlpha' />
          </HStack>
          <HStack justifyContent='space-between' mb='1.2rem'>
            <Text color='#2B2B2B' fontWeight='semibold'>
              Mute Until
            </Text>
            <Select
              backgroundColor='#F9F9F9'
              border='1px solid #C9C9C9'
              borderRadius='3px'
              w='219px'
              p='7px'
            >
              <option value='option1'>Until I turn it back on</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </HStack>
          <Flex mb='1.3rem'>
            <Text color='#2B2B2B' fontWeight='semibold' w='460px'>
              Surpress @everyone and @here
            </Text>
            <Switch id='suppressEveryone' colorScheme='blackAlpha' />
          </Flex>
          <Flex mb='1rem'>
            <Text color='#2B2B2B' fontWeight='semibold' w='460px'>
              Surpress all roles @mentions
            </Text>
            <Switch id='suppressRoles' colorScheme='blackAlpha' />
          </Flex>
        </ModalBody>

        <ModalFooter mb='1.3rem'>
          <Button
            borderRadius='md'
            bg='black'
            colorScheme='blackAlpha'
            px='3rem'
          >
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NotificationModal
