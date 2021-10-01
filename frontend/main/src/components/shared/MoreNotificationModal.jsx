import React, {useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text, 
  Radio,
  RadioGroup,
  Stack,
  Box
} from '@chakra-ui/react';
import { VStack, Button } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useDispatch } from 'react-redux';
import appActions from '../../redux/actions/app';
import { bindActionCreators } from 'redux';


const MoreNotificationModal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("1")
  const [webSetting, setWebSetting] = useState(1)

  const [checked, setChecked] = useState("");

  const dispatch = useDispatch()

  const { _setNotifications } = bindActionCreators(appActions, dispatch);

  const handleChange = (e) => {
    setChecked(e.target.checked)
    setWebSetting(e.target.value)
    console.log(e.target.value, webSetting);
    switch (webSetting) {
      case "1":
        console.log(webSetting, "all setting clicked");
        break;
      case "2":
        console.log("Mention setting clicked");
        break;
      case "3":
        console.log("Nothing setting clicked");
        break;
    
      default:
        console.log(webSetting, "no input");
        break;
    }
  }
  
  const datas ={
          "web": "all",
          "mobile": "all",
          "same_for_mobile": true,
          "mute": true
  }




  return (
    <>
    <Text onClick={onOpen}>Open Modal</Text>
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Notifications</ModalHeader>
        <ModalCloseButton />
        <ModalBody>          
          <VStack alignItems="flex-start" borderBottom= "1px solid #EBEBEB">
          <Text fontSize="15px" fontWeight="bold">Send a notification for</Text>
          <RadioGroup onChange={setValue} value={value} name="web-setting">
            <Stack direction="column" mb="24px">
              <Radio colorScheme="green" onChange={handleChange} value="1">All messages</Radio>
              <Radio colorScheme="green" onChange={handleChange} value="2">Mentions</Radio>
              <Radio colorScheme="green" onChange={handleChange} value="3">Mute Channel</Radio>
            </Stack>
          </RadioGroup>
          </VStack>

          <Stack dir="column" mt="24px" fontSize="15px" fontWeight="bold" borderBottom= "1px solid #EBEBEB">
            <Checkbox colorScheme="green">
              Use different settings for mobile devices
            </Checkbox>
            <RadioGroup name="mobile-setting">
              <Stack direction="column" mb="24px" ml="20px">
                <Radio colorScheme="green" value="4">All messages</Radio>
                <Radio colorScheme="green" value="5">Mentions</Radio>
                <Radio colorScheme="green" value="6">Mute Channel</Radio>
              </Stack>
          </RadioGroup>
          </Stack>

          <Box mt="24px">
            <Checkbox colorScheme="green" fontStyle="15px" fontWeight="bold">
              Mute Channel
            </Checkbox>
            <Text fontSize="15px" ml="20px">
            Muted channels are greyed out at the bottom of your channel list. You’ll still see a badge in the sidebar if you’ve been mentioned.
            </Text>
          </Box>
          
        </ModalBody>
        <ModalFooter>
          <Button
            color="#FF0000"
            backgroundColor="transparent"
            border="1px solid #FF0000"
            borderRadius="4px"
            variant="solid"
            fontSize="15px"
            fontWeight="400"
            mr="10px"
            _hover={{ 
              color: "#FF0000",
              backgroundColor:"transparent"
             }}
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
              _hover={{ 
                color: "#ffffff",
                backgroundColor:"00B87C"
              }}
              disabled={!checked}
            >
              Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}

export default MoreNotificationModal;
