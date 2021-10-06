import React, { useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { Flex, Button, IconButton, Image } from "@chakra-ui/react";
import { AiOutlineStar } from 'react-icons/ai';
import { ImNotification } from "react-icons/im";
import { Icon } from "@chakra-ui/icon";
import pinImage from "../../assets/pin.png";
import searchImage from "../../assets/search.png";
import infoImage from "../../assets/info.png";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import PinnedMessages from "./PinnedMessages";
import NewChannelHeader from "./pluginHeader";
import _ from "lodash";
import MoreNotificationModal from "./MoreNotificationModal";
import { useDisclosure } from "@chakra-ui/hooks";

const ChannelHeader = ({channelId}) => {
  const { users } = useSelector(state => state.appReducer)
  let _users;
  let orgId;

  useEffect(() => {
    _users = users;
    orgId = _users.currentWorkspace;
    console.log("this is the orgId channel header", orgId);
  });
  const channel_id = channelId; //assigning dynamic channel id to channel_id
  console.log(channel_id);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()

   //.......getting pinned messages from redux store...........//
  const { _getPinnedMessages } = bindActionCreators(appActions, dispatch); //extract redux function
  const { pinnedMessages } = useSelector((state) => state.channelsReducer);
  console.log("Number of pinned messages = " + pinnedMessages);

  useEffect(() => {

    _getPinnedMessages(orgId, channel_id);

  }, []); // get pinned messages


  return (
    <Box width="99.9%">

      <NewChannelHeader channelId = {channelId} />
      
      {/* Section that holds the pinned and bookmark buttons  */}
      <Box ml='1px' display={['none','flex']}>
        <Flex w='100%' alignItems='center' justifyContent='flex-start' flexDir='row' p={4} bgColor="#E1FDF4" height='33px' > 
          {pinnedMessages > 0 && (
              <PinnedMessages>
                <Button mr='10px' {...pinnedAndBookmarkButtonStyle} textColor='#B0AFB0' leftIcon={<Image src={pinImage}/>}>{pinnedMessages.length} Pinned</Button>
              </PinnedMessages>
          )}
          <IconButton {...pinnedAndBookmarkButtonStyle} width='33px' icon={<Icon w={5} h={4} as={AiOutlineStar}/>}></IconButton>        
          <IconButton {...pinnedAndBookmarkButtonStyle} width='33px' icon={<Icon w={5} h={4} as={ImNotification} onClick={onOpen}/> }></IconButton>        
          <MoreNotificationModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Box> 
    </Box> 
  );
};

const pinnedAndBookmarkButtonStyle = {
  bg: "#BCF9E6",
  height:'25px',
  ml:'10px',
  borderRadius: "4px",
  size: "sm",
  fontWeight: "normal",
  fontSize: "13px",
  fontStyle: "normal",
  _hover: {
    bg: "#98FFDD"
  },
  _focus: {
    outline: "none",
    bg: "#98FFDD"
  }
}

export default ChannelHeader; 
