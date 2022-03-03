/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Button,
  Checkbox
} from "@chakra-ui/react"

// import { useDisclosure } from "@chakra-ui/hooks"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { useParams } from "react-router"
import appActions from "../../redux/actions/app"

const MoreNotificationModal = ({ isOpen, onClose }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [value, setValue] = useState("1")
  const [userSetting, setUserSetting] = useState()
  const [orgId, setOrgId] = useState()

  const [allMessages, setAllMessages] = useState()
  const [Mentions, setMentions] = useState()
  const [muteChannel, setMuteChannel] = useState(false)

  const [checked, setChecked] = useState("")

  const dispatch = useDispatch()

  const { channelId } = useParams()

  const { _setNotifications } = bindActionCreators(appActions, dispatch)

  const { users } = useSelector(state => state.appReducer)

  useEffect(() => {
    if (users) {
      setOrgId(users[0])
    }
  }, [])

  // useEffect(() =>{
  //   if(orgId){

  //   }
  // })

  let webSetting
  let muteChannelOption

  const handleAllMessages = e => {
    setChecked(e.target.checked)
    setAllMessages(e.target.checked)
  }
  const handleMentions = e => {
    setChecked(e.target.checked)
    setMentions(e.target.checked)
  }
  const handleMuteChannel = e => {
    setChecked(e.target.checked)
    muteChannelOption = e.target.checked
    setMuteChannel(muteChannelOption)
  }

  useEffect(() => {
    if (allMessages) {
      webSetting = "all"
      setUserSetting(webSetting)
    } else if (allMessages && Mentions) {
      webSetting = "all"
      setUserSetting(webSetting)
    } else if (!allMessages && Mentions) {
      webSetting = "mentions"
      setUserSetting(webSetting)
    } else if (!allMessages && !Mentions) {
      webSetting = "nothing"
      setUserSetting(webSetting)
    }

    // console.log("Web setting is: ", userSetting)
  }, [allMessages, Mentions])

  const datas = {
    web: userSetting,
    mobile: "all",
    same_for_mobile: true,
    mute: muteChannel
  }

  const saveUserNotificationSettings = () => {
    _setNotifications(
      "614679ee1a5607b13c00bcb7",
      "615064306dc33f65ab425514",
      "614f06e6e35bb73a77bc2aa3",
      datas
    )
    console.log(datas)
  }

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Send a notification for</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="flex-start">
              <Checkbox
                paddingTop="1rem"
                colorScheme="green"
                onChange={handleAllMessages}
              >
                All messages
              </Checkbox>
              <Checkbox
                paddingTop="1rem"
                colorScheme="green"
                onChange={handleMentions}
              >
                Mentions
              </Checkbox>
              <Checkbox
                paddingTop="1rem"
                colorScheme="green"
                onChange={handleMuteChannel}
              >
                Mute Channel
              </Checkbox>
            </VStack>
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
                backgroundColor: "transparent"
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
                backgroundColor: "00B87C"
              }}
              // disabled={!checked}
              onClick={saveUserNotificationSettings}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MoreNotificationModal
