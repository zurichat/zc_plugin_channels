import { FormControl, FormLabel, Heading, Input, ModalBody, ModalCloseButton, ModalFooter, Switch, useDisclosure } from '@chakra-ui/react'
import { Button, Modal, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'

import React from 'react'

const CreateChannelModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    return (
        <>
        <Button onClick={onOpen}size="sm" bg="#00b87c" color="white" pt="2" pb="2" fontSize="14px">Create New channel</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size="lg"
        >
          <ModalOverlay />
          <ModalContent p={2} mt="8rem" borderRadius="2px">
            <ModalHeader pb={0} fontSize="20px">Create a Channel</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={3} >
            <Text color='#8B8B8B' pb={4} fontSize="16px" pr={0}>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</Text>

              <FormControl mb={7}>
                <FormLabel fontWeight="bold">Name</FormLabel>
                <Input ref={initialRef} height="3.2rem" borderRadius="2px" focusBorderColor="green.200"/>
              </FormControl>
  
              <FormControl mt={5}>
                <FormLabel fontWeight="bold">Description <i style={{color:"#8b8b8b", fontStyle:"normal" ,fontWeight:"normal"}}>(optional)</i> </FormLabel>
                <Input height="3.2rem" borderRadius="2px" focusBorderColor="green.200"/>
              </FormControl>

              <Text color='#8B8B8B' pb={8} fontSize="16px" pr={0}>What is this channel about?</Text>
            
                <Heading as="h5" size="sm" fontSize="16px" fontWeight="600" mt="1">Make this Channel Private</Heading>
                <FormControl display="flex" alignItems="center" mb={2}>
                    <FormLabel mb="0" width="90%" color="#8b8b8b" fontSize="15px" pt="2" fontWeight="normal">
                    When a channel is set to private, <br/>
                    it can only be viewed or joined by invitation.
                    </FormLabel>
                    <Switch colorScheme="whatsapp" focusBorderColor="green.400"/>
                </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button backgroundColor="#00B87C" pt={6} pb={6} colorScheme="white" width="12rem" mb="4" borderRadius="3px" onClick={onClose}>
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default CreateChannelModal;
