import cancelIcon from '../../assets/cancel_icon.png'

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
    Flex,
    Center,
    Box,
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
            h='442px' maxW='464px'
            padding='0px'
            margin= '0px'
            borderRadius='4px'  >
              <Flex 
                borderBottom='1px solid #F6F6F6'
                margin='0'
                padding='32px 29px 26px 23px'
                >
                <Center 
                  justifyContent='space-between'
                  width='100%'
                  >
                   <ModalHeader 
                    padding ='0px'
                    fontSize='18px'
                    >
                      Description
                  </ModalHeader>
                  <Flex>
                    <Center
                    width='40px'
                    height= '40px'
                    borderRadius='3px'
                    _hover={{backgroundColor:'#F6F6F6'}}
                    onClick={onclose}
                    >
                      <img src={cancelIcon} alt='cancel_icon' />
                    </Center>
                    
                  </Flex>
                </Center>
                
              </Flex>
           
            <ModalBody padding='0px 29px 0px 23px' mt='24px' >
              <Textarea
                height='159px'
                maxWidth = '100%'
                margin='0px'
                borderRadius='3px'
                fontSize='13px'
                fontWeight='400'
                ref={initialRef}
                resize='none'
                focusBorderColor='green.500'
                placeholder='Add description'
                onChange={onTextAreaChange}
                _placeholder={{fontSize:'13px',fontWeight: 400}}
                
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
  
            <ModalFooter padding='0px 23px 24px'>
              <Button 
              fontSize='15px'
              fontWeight='400'
              padding='12px 18px'
              borderRadius='3px'
              border='1px solid red'
              color='red'
              backgroundColor ='white'
              mr='20px'
              onClick={onClose}>
                Cancel
              </Button>
              <Button 
                colorScheme='green'
                color='white'
                backgroundColor ='#00B87C'
                fontSize='15px'
                fontWeight='400'
                padding='12px 18px'
                borderRadius='3px'
                onClick={() => saveDescription(description)}
                >Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

