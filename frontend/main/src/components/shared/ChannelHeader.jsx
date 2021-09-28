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

import { useParams } from "react-router";

//avatar details(Just a placeholder)
const avatars = [
  { name: "Kent Dodds",  index: 1 },
  { name: "Segun Adebayo",  index: 2 },
  { name: "Christian Nwamba", index: 3 },
];


const ChannelHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { channelId } = useParams()//dynamic channel id
  const org_id = '614679ee1a5607b13c00bcb7';//Test value for org id
  const channel_id = channelId; //assigning dynamic channel id to channel_id
  console.log(channel_id);
  const dispatch = useDispatch();

  const { _getPinnedMessages, _getChannelDetails } = bindActionCreators(appActions, dispatch);//extract redux function
  //.......getting pinned messages...........//
  const { pinnedMessages } = useSelector((state) => state.channelsReducer)
  console.log('Number of pinned messages = ' + pinnedMessages)
  useEffect(() => {_getPinnedMessages(org_id, channel_id); }, [])// get pinned messages
  //-------getting channel details.........//
  const { channelDetails } = useSelector((state) => state.channelsReducer);//extract redux state
  console.log(channelDetails.name, channelDetails.members, channelDetails.private);//to see what kind of data I'm actually getting
  const loadChannelDetails = async () => { await _getChannelDetails(org_id, channel_id);};
  useEffect(() => { loadChannelDetails(); }, [channelId]);
  
  const isPrivate = channelDetails.private;// to check if channel is private or not
  //const users = [channelDetails.users]; //to get users of a channel
  
  return (
    <Box width="99.9%">
      <Flex flexShrink={0} ml="1px" align="center" bgColor="#00B87C" height="47px" boxShadow="xs" maxWidth='100%' w="100%" display={['none','flex']}>
        <> 
          <Button size='sm' bgColor='#00B87C' _focus={{ bg: "#00C384" }} _active={{ bg: "#00C384" }} flexShrink={0} borderRadius="6px" ml={5} width='20%' height='30px' p="4" align="center" _hover={{ bg: "#00C384" }} onClick={onOpen}>
            {isPrivate === true ? <Icon as={ BiLockAlt } color="#ffffff" h={5} w={5} mr={2}  /> :<Icon as={ FiHash } color="#ffffff" h={5} w={5} mr={2} />  }       
            <Box as="span" letterSpacing='wide' lineHeight='32px' fontSize="17.5px" color="#ffffff" fontWeight="medium" mr={1}>{channelDetails.name}</Box> 
            <Icon as={BiChevronDown} color="#ffffff" w={6} h={5} />
          </Button>
          <ChannelDetails isOpen={isOpen} onClose={onClose} />
        </> 
        <Spacer />
        <Link to="/channel-detail"><Flex p="4"><Spacer/>
          <Button variant='ghost' bgColor='#01D892' _hover={{ bg: "#01D892" }} _focus={{ bg: "#01D892" }} _active={{ bg: "#01D892" }} size='sm' width="85%" borderRadius='4px'  height='33px' mr='0.5%'>
            {/* <AvatarGroup ml='0.1px' size="sm" max={3} spacing='-2' >
              {avatars.map((avatar) => {
                return <Avatar name={avatar.name} borderRadius="5px" borderWidth='2px' borderColor='#01D892' height='31px' width='31px' />;
              })}
            </AvatarGroup> */}
            <Box as="span" fontWeight='medium' mr='8px' ml='5px' textColor='#ffffff' fontWeight="semi-bold" >{channelDetails.members}</Box>
          </Button>
          </Flex></Link>
      </Flex>
      <Box ml='1px' display={['none','flex']}>
        <Flex w='100%' alignItems='center' justifyContent='flex-start' flexDir='row' p={4} bgColor="#E1FDF4" height='33px' > 
          {pinnedMessages && (
              <PinnedMessages>
                <Button mr='10px' {...pinnedAndBookmarkButtonStyle} textColor='#B0AFB0' leftIcon={<Image src={pinImage}/>}>{pinnedMessages.length} Pinned</Button>
              </PinnedMessages>
          )}
          <IconButton {...pinnedAndBookmarkButtonStyle} width='33px' icon={<Icon w={5} h={4} as={AiOutlineStar}/>}></IconButton>        
        </Flex>
      </Box> 
      {/*Mobile responsive version */}
      <Flex ml="3px" align="center" bgColor="#00B87C" height="75.92px" boxShadow="xs" maxWidth='1172px' w="100%" display={['flex','none']}>
        <Icon as={ BiChevronLeft } color="#ffffff" h={10} w={10} ml={2}  />
          <Link to='/channel-detail'><Flex ml={1}  alignContent='center' flexDir='column'>
            <Flex align='center' flexDir='row'>
            {isPrivate === true ? <Icon as={ BiLockAlt } color="#ffffff" h={5} w={5} mr={2}  /> :<Icon as={ FiHash } color="#ffffff" h={5} w={5} mr={2} />  }
              <Box as="span" letterSpacing='wide'  fontSize="18px" color="#ffffff" fontWeight="501" mr={1} >
                {channelDetails.name}
              </Box>
            </Flex>
            <Box as='span' fontSize='12px' fontWeight='500' ml='2%' color='#ffffff'>{channelDetails.members} members</Box>
          </Flex></Link> 
          <Spacer /> 
          <Flex p="4" align='center'>
            <HStack spacing='10px' justifyContent='space-between'>
            <IconButton variant='unstyled' size='sm' icon={<Image src={searchImage}  color='#ffffff'/>} aria-label="search"></IconButton>
           <Link to="/channel-detail"><IconButton variant='unstyled' size='sm' icon={<Image src={infoImage}  color='#ffffff'/>} aria-label='channel-details' color='#ffffff' /></Link></HStack>
          </Flex>
      </Flex> 
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
