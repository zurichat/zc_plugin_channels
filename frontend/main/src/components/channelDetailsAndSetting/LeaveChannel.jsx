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
    Text, 
    useDisclosure, 
    Container, 
    Checkbox
} from "@chakra-ui/react"


function LeaveChannel() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
        <>
            <Button onClick={onOpen}>Leave Channel</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg='#00000060' />
                <Container p='30px'>
                <ModalContent bg='white' p='50px' maxW="604px"  m="auto" >
                    <ModalHeader display='flex' alignItems='center' justifyContent='space-between'>
                        <Text  m='0px' p='0px' fontSize='34px' fontWeight='700'>Leave #Announcement</Text>
                        <ModalCloseButton   cursor='pointer' p='3px' bg='none' w='22.5px' h='22.5px' fontSize='14px' border='none'/>
                    </ModalHeader>

                    <ModalBody>
                        <Text color='#8B8B8B' fontSize='18px' maxW='500px' mb='60px'> Channel members won’t be notified that you’ve left. You can rejoin anytime</Text>
                    </ModalBody>

                    <ModalFooter display='flex' flexWrap='wrap' justifyContent='space-between'>
                        <Container display='flex' alignItems='center'>
                            <Checkbox w='18px' height='18px' border='3px solid #1D1C1D' borderRadius='3px' isInvalid></Checkbox>
                            <Text m='0' ml='13px' fontSize='18px' color='#8B8B8B'>Don’t show this again</Text>
                        </Container>
                        <Container display='flex'>
                            <Button cursor='pointer' h='30px' p='16px 16px' m='15px' ml='0px' mb='0px' borderRadius='5px' fontSize='16px' color='#00AD75' fontWeight='700' border='2px solid #00AD75' bg='white' onClick={onClose}>
                                Cancel
                            </Button>
                            <Button cursor='pointer' h='30px' p='18px 16px' m='15px' ml='0px' mb='0px' border='none' borderRadius='5px' fontSize='16px' color='#fff' fontWeight='700' bg='#00AD75' >Leave Channel</Button>
                        </Container>
                    </ModalFooter>
                </ModalContent>
                </Container>
            </Modal>
        </>
    )
}

export default LeaveChannel
