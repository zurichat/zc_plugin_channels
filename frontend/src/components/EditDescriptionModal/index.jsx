import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Textarea,
    useDisclosure,
    Text,
  } from "@chakra-ui/react"
import React, { useState } from 'react'


/*
DESCRIPTION:
When this modal is mounted, it will present a buton that when clicked will pop up the modal

REQUIRED PROPS:
the modal requires saveDescription prop which should be implemented as a
function that receives 'description' as parameter. 
The description parameter is the content of the text area after the user
has clicked save. A sample of such function is shown below

function saveDescription(description){
    console.log(description)
  }
*/
  export default function EditDescriptionModal(props) {

    //picking up the prop
    const {saveDescription} = props

    //Chakra specific hook for handling modal opening and closing
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const [description, setDescription] = useState('')

    //handles text area change event
    function onTextAreaChange(event){
        setDescription(event.target.value)
    }


    return (
      <>

        {/* The button is what get's rendered when this component is mounted */}
        <Button onClick={onOpen}>Edit Description</Button>

        <Modal isOpen={isOpen} onClose={onClose}
               initialFocusRef={initialRef}
               isCentered
            >
          <ModalOverlay />
          <ModalContent 
            h='408px' maxW='565px'
            padding='0 24px'  >
            <ModalHeader 
                padding ='0px'
                mt='24px'
                mb='0px'
                fontSize='24px' 
                >
                  Edit Description
            </ModalHeader>
            <ModalCloseButton mt='16px' marginRight='10px' fontSize='14px' />
            <ModalBody padding='0px' mt='24px' >
              <Textarea
                height='201px'
                borderRadius='3px'
                ref={initialRef}
                resize='none'
                focusBorderColor='green.500'
                onChange={onTextAreaChange} 
              /> 
              <Text 
                mt='24px'
                fontWeight='400'
                fontSize='15px'
                lineHeight='19.5px'
                fontFamily='Lato'
                color='#8B8B8B'
                >
                  Let people know what this channel is for
              </Text>
            </ModalBody>
  
            <ModalFooter
                padding='0px 0px 25px'
            >
              <Button 
              fontSize='16px'
              fontWeight='400'
              padding='0px 36px'
              height='30px'
              borderRadius='3px'
              width='105px'
              border='1px solid #00B87C'
              color='#00B87C'
              backgroundColor ='white'
              mr='20px'
              onClick={onClose}>
                Cancel
              </Button>
              <Button 
                colorScheme='green'
                color='white'
                backgroundColor ='#00B87C'
                fontSize='16px'
                fontWeight='400'
                padding='0px 36px'
                height='30px'
                width='105px'
                borderRadius='3px'
                onClick={() => saveDescription(description)}
                >Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

