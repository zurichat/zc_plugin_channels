import React, { useEffect } from "react";
import { Box, HStack } from "@chakra-ui/layout";
import { Flex, Spacer, Avatar, AvatarGroup, Button, IconButton, Image, useDisclosure } from "@chakra-ui/react";
import { BiChevronDown, BiChevronLeft, BiLockAlt } from "react-icons/bi";
import { AiOutlineStar } from 'react-icons/ai';
import { Icon } from "@chakra-ui/icon";
import { FiHash } from "react-icons/fi";
import { Link } from "react-router-dom";
import pinImage from "../../assets/pin.png";
import searchImage from "../../assets/search.png";
import infoImage from "../../assets/info.png";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import PinnedMessages from "./PinnedMessages";
import ChannelDetails from "../channelDetailsAndSetting/channelDetailsAndSettings";
import NewChannelHeader from "./pluginHeader";

import { useParams } from "react-router";

//avatar details(Just a placeholder)
const avatars = [
  { name: "Kent Dodds",  index: 1 },
  { name: "Segun Adebayo",  index: 2 },
  { name: "Christian Nwamba", index: 3 },
];


const ChannelHeader = ({channelId, org_id}) => {
  // const { channelId } = useParams()//dynamic channel id
  // const org_id = '614679ee1a5607b13c00bcb7';//Test value for org id
  const channel_id = channelId; //assigning dynamic channel id to channel_id
  console.log(channel_id);
  const dispatch = useDispatch();

  const { _getPinnedMessages } = bindActionCreators(appActions, dispatch); //extract redux function
  //.......getting pinned messages...........//
  const { pinnedMessages } = useSelector((state) => state.channelsReducer);
  const { users } = useSelector((state) => state.appReducer);
  console.log("Number of pinned messages = " + pinnedMessages);

  useEffect(() => {
    _getPinnedMessages(org_id, channel_id);
  }, []); // get pinned messages
  return (
    <Box width="99.9%">

      <NewChannelHeader channelId = {channelId} org_id={org_id} />
      
      {/* Section that holds the pinned and bookmark buttons  */}
      <Box ml='1px' display={['none','flex']}>
        <Flex w='100%' alignItems='center' justifyContent='flex-start' flexDir='row' p={4} bgColor="#E1FDF4" height='33px' > 
          {pinnedMessages > 0 && (
              <PinnedMessages>
                <Button mr='5px' {...pinnedAndBookmarkButtonStyle} textColor='#B0AFB0' leftIcon={<Image src={pinImage}/>}>{pinnedMessages.length} Pinned</Button>
              </PinnedMessages>
          )}
          <IconButton {...pinnedAndBookmarkButtonStyle} width='33px' icon={<Icon w={5} h={4} as={AiOutlineStar}/>}></IconButton>        
        </Flex>
      </Box> 
    </Box> 
  );
};

const pinnedAndBookmarkButtonStyle = {
  bg: "#BCF9E6",
  height:'25px',
  ml:'5px',
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
