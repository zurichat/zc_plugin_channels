import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Flex,
  Switch,
  Select,
} from "@chakra-ui/react";

//KINDLY NOTE USAGE (NB: not for bosses like charles)

//Step 1: import the useDisclosure from "@chakra-ui/react" in the component where the modal is needed
//        and use it like so  const { isOpen, onOpen, onClose } = useDisclosure();
//Step 2: import this component (NotificationModal) into the component where it is needed.
//        and pass isOpen and onClose as props e.g <NotificationModal isOpen={isOpen} onClose={onClose} />
//Step 3: Lastly, in the component you need it, attach an onclick={onOpen} to the required button

//Voilllaaaaaaaaaaaaaaaaaaaaaaaa
function NotificationModal(props) {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={props.isOpen}
        onClose={props.onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent p="20px">
          <ModalHeader pb="10px">Notification Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="16px" w="460px" color="#8B8B8B">
              Adjust your notifications, alerts, and message alert settings
              here.
            </Text>
            <Text color="#2B2B2B" fontWeight="semibold" mt="20px">
              Mute this channel
            </Text>

            <Flex mb="55px">
              <Text w="460px" pr="100px">
                When a channel is set to mute, you will not be able to see
                unread unless it is mentioned.
              </Text>

              <Switch mt="5px" id="muteChannel" colorScheme="green" />
            </Flex>
            <Flex justifyContent="space-between" mb="50px">
              <Text color="#2B2B2B" fontWeight="semibold">
                Mute Until
              </Text>
              <Select
                backgroundColor="#F9F9F9"
                border="1px solid #C9C9C9"
                borderRadius="3px"
                w="219px"
                p="7px"
              >
                <option value="option1">Until I turn it back on</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Flex>
            <Flex mb="40px">
              <Text color="#2B2B2B" fontWeight="semibold" w="460px">
                Surpress @everyone and @here
              </Text>
              <Switch id="suppressEveryone" colorScheme="green" />
            </Flex>
            <Flex mb="20px">
              <Text color="#2B2B2B" fontWeight="semibold" w="460px">
                Surpress all roles @mentions
              </Text>
              <Switch id="suppressRoles" colorScheme="green" />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              borderRadius="3px"
              color="#fff"
              backgroundColor="#00B87C"
              p="14px 81px"
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NotificationModal;
