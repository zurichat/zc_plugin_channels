import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Text, useDisclosure, Container, Checkbox
} from "@chakra-ui/react"

function LeaveChannel() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Leave Channel</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg='#00000060' />
                <ModalContent bg='white' p='50px' maxW="617px" m="auto">
                    <ModalHeader display='flex' alignItems='center' justifyContent='space-between'>
                        <Text m='0px' p='0px' fontSize='25px' fontWeight='700'>Leave #Announcement</Text>
                        <ModalCloseButton cursor='pointer' p='3px' bg='none' w='22.5px' h='22.5px' fontSize='10px' borderRadius='3px' border='2px solid #2B2B2B' />
                    </ModalHeader>

                    <ModalBody>
                        <Text fontSize='18px' maxW='500px' mb='60px'> Channel members won’t be notified that you’ve left. You can rejoin anytime</Text>
                    </ModalBody>

                    <ModalFooter display='flex' justifyContent='space-between'>
                        <Container display='flex' alignItems='center'>
                            <Checkbox w='18px' height='18px' border='2px solid #616061' borderRadius='3px' isInvalid></Checkbox>
                            <Text m='0' ml='13px' fontSize='16px' color='616061'>Don’t show this again</Text>
                        </Container>
                        <Container>
                            <Button cursor='pointer' p='13px 20px' mr='15px' borderRadius='5px' fontSize='16px' color='#2B2B2B' fontWeight='700' border='2px solid #2B2B2B' bg='white' onClick={onClose}>
                                Cancel
                            </Button>
                            <Button cursor='pointer' p='14px 20px' border='none' borderRadius='5px' fontSize='16px' color='#fff' fontWeight='700' bg='#00AD75' >Leave Channel</Button>
                        </Container>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default LeaveChannel
