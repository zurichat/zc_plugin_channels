import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react'

function DeleteChannel() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}> Delete channel</Button>
      <Box >
        <Modal isOpen={isOpen} onClose={onClose} size='xl' >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color='#000000' fontStyle='bold' fontSize='31px' p={5}>
              Delete message
            </ModalHeader>
            <Text color='#3A3A3A' m={5} p={5}>
              Are you sure you want to delete this channel?This cannot be undone
            </Text>
            <ModalCloseButton />

            <ModalBody>
              <Box
                p={3}
                borderRadius='10px'
                border='1px'
                borderColor='blue.200'
              >
                <Flex direction>
                
              
                  <Box>
                    
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                border='1px'
                borderColor='gray.200'
                bg='white'
                color='#000'
                mr={3}
                p={3}
                onClick={onClose}
                borderRadius='10px'
                width='151px'
                height='56px'
              >
                Cancle
              </Button>
              <Button
                variant='ghost'
                border='1px'
                borderColor='gray.200'
                color='white'
                bg='#e23434'
                borderRadius='5px'
                width='151px'
                height='56px'
                _hover={{ bg: '#000' }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}

export default DeleteChannel
