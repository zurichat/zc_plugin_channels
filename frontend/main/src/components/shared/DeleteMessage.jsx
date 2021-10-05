import {
    Modal,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    HStack,
    Box,
    Image
  } from "@chakra-ui/react"
  
  function DeleteMessage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}
        isCentered>
          <ModalOverlay />
          <ModalContent h="394px" maxW="721px" padding="34">
            <ModalHeader
              p="0"
              fontSize="31px"
              fontWeight="700"
              fontFamily="Lato"
              left="32px"
              top="34px">
                Delete message
            </ModalHeader>
            <ModalCloseButton
            right="34px"
            top="40px"
            size="lg"
            onClick={onClose}/>
            <ModalBody p="0" >
              <Text color="#8B8B8B"
              fontSize="15px"
              fontWeight="400"
              fontFamily="Lato"
              pt="30px"
              pb="47px">
              Are you sure you want to delete this message? This cannot be undone.
              </Text>
              <Box className="Box01"
              w="655px"
              h="97px"
              bg="transparent"
              borderRadius="10px"
              border="1px rgba(0,0,0,30%) solid"
              pt="14px"
              pl="11px"
              display="flex">
                <Image src="{Image-Avatar}"
                fallbackSrc="https://via.placeholder.com/150"
                borderRadius="4px"
                boxSize="36px"
                />
                <Box ClassName="Box02"
                ml="9px">
                  <Box ClassName="Box03"
                    display="flex">
                    <Text fontSize="15px"
                    fontWeight="900"
                    fontFamily="Lato"
                    maxW="900px">
                      Deyrin Cutting
                    </Text>
                    <Text fontSize="12px"
                    fontWeight="400"
                    fontFamily="Lato"
                    ml="8px"
                    mt="3.5px">
                      10:10 AM
                    </Text>
                  </Box>
                  <Text fontSize="15px"
                  fontWeight="400"
                  fontFamily="Lato"
                  maxW="584px"
                  mt="10px"
                  ml="7px">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus nunc arcu ornare iaculis.
                    Volutpat tempus egestas donec pretium.
                  </Text>
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter p="0" justifyContent="right">
              <HStack>
                <Button onClick={onClose}
                borderRadius="10px"
                bg="transparent"
                border="1px rgba(0,0,0,30%) solid"
                h="44px"
                w="118px"
                fontSize="20px"
                fontWeight="700"
                fontFamily="Lato"
                >
                  Cancel
                </Button>
                <Button /*onClick={deleteMessage}*/
                borderRadius="10px"
                bg="#E23434"
                color="#ffffff"
                h="44px"
                w="118px"
                fontSize="20px"
                fontWeight="700"
                fontFamily="Lato">
                  Delete
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default DeleteMessage;
  