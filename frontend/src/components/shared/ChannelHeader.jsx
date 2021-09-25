import React, { useEffect } from "react";
import { Box, HStack } from "@chakra-ui/layout";
import { Flex, Spacer, Avatar, AvatarGroup, Button, IconButton, Image } from "@chakra-ui/react";
import { BiChevronDown, BiChevronLeft, BiLockAlt } from "react-icons/bi";
import { Icon } from "@chakra-ui/icon";
import { FiHash } from "react-icons/fi";
import { Link } from "react-router-dom";
import pinImage from "../../assets/pin.png";
import addImage from "../../assets/add.png";
import searchImage from "../../assets/search.png";
import infoImage from "../../assets/info.png";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import PinnedMessages from "./PinnedMessages";

//avatar details(Just a placeholder)
const avatars = [
  { name: "Kent Dodds", avi: "https://bit.ly/kent-c-dodds", index: 1 },
  { name: "Segun Adebayo", avi: "https://bit.ly/sage-adebayo", index: 2 },
  { name: "Christian Nwamba", avi:"https://bit.ly/code-beast",index: 3 },
];

const ChannelHeader = () => {
  const org_id = 1;//Test value for org id
  const channel_id = "613f70bd6173056af01b4aba"; // Hardcoded value to for channel_id in org with id 1
  const dispatch = useDispatch();
  //.......getting pinned messages...........//
  const { pinnedMessages } = useSelector((state) => state.channelsReducer)
  const { _getPinnedMessages } = bindActionCreators(appActions, dispatch);
  useEffect(() => {_getPinnedMessages(org_id, channel_id); }, [])// get pinned messages
  //-------getting channel details.........//
  const { _getChannelDetails } = bindActionCreators(appActions, dispatch);//extract redux function
  const { channelDetails } = useSelector((state) => state.channelsReducer);//extract redux state
  console.log(channelDetails.name, channelDetails.members, channelDetails.private);//to see what kind of data I'm actually getting
  const loadChannelDetails = async () => { await _getChannelDetails(org_id, channel_id);};
  useEffect(() => { loadChannelDetails(); }, []);
  
  const isPrivate = channelDetails.private;// to check if channel is private or not
  
  
  return (
    <Box width="95vw" mt="5px">
      <Flex flexShrink={0} ml="1px" align="center" bgColor="#00B87C" height="44px" boxShadow="xs" maxWidth='100vw' w="95vw" display={['none','flex']}>
        <Link to="/channel-detail">  
          <Button size='sm' bgColor='#00B87C' _focus={{ bg: "#00C384" }} flexShrink={0} borderRadius="6px" ml={5} width='80%' height='30px' p="4" align="center" _hover={{ bg: "#00C384" }} >
            {isPrivate === 'True' && <Icon as={ BiLockAlt} color="#ffffff" h={5} w={5} mr={2}  />}
            {isPrivate === 'False' &&  <Icon as={ FiHash } color="#ffffff" h={5} w={5} mr={2} />}            
            <Box as="span" letterSpacing='wide' lineHeight='32px' fontSize="17.5px" color="#ffffff" fontWeight="501" mr={1}>{channelDetails.name}</Box> 
            <Icon as={BiChevronDown} color="#ffffff" w={6} h={5} />
          </Button>
        </Link> 
        <Spacer />
        <Link to="/channel-detail"><Flex p="4"><Spacer/>
          <Button variant='outline' bgColor='#ffffff' size='sm' width="85%" borderRadius='4px'  height='33px' mr='0.5%'>
              <AvatarGroup ml='0.1px' size="sm" max={3} spacing='-2' >
                {avatars.map((avatar, index) => {
                  return <Avatar key={`ch-hd-${index}`} borderRadius="5px" borderWidth='2px' borderColor='#ffffff' height='31px' width='31px' name={avatar.name} src={avatar.avi} />;
                })}
              </AvatarGroup>
              <Box as="span" fontWeight='medium' mr='8px' ml='5px'>{channelDetails.members}</Box>
          </Button>
          </Flex></Link>
      </Flex>
      <Box ml='1px'  display={['none','flex']}>
        <Flex w='95vw' alignItems='center' justifyContent='flex-start' flexDir='row' p={4} bgColor="#E1FDF4" height='1.938rem' > 
          { pinnedMessages.length > 0 && (
            <PinnedMessages>
              <Button mr='10px' {...pinnedAndBookmarkButtonStyle} leftIcon={<Image src={pinImage}/>}>{pinnedMessages.length} Pinned</Button>
            </PinnedMessages>
          ) }
          <Button {...pinnedAndBookmarkButtonStyle} leftIcon={<Image src={addImage}/>}>Add a bookmark</Button>        
        </Flex>
      </Box> 
      {/*Mobile responsive version */}
      <Flex ml="3px" align="center" bgColor="#00B87C" height="75.92px" boxShadow="xs" maxWidth='1172px' w="100%" display={['flex','none']}>
        <Icon as={ BiChevronLeft } color="#ffffff" h={10} w={10} ml={2}  />
          <Link to='/channel-detail'><Flex ml={1}  alignContent='center' flexDir='column'>
            <Flex align='center' flexDir='row'>
            {isPrivate==='True' && <Icon as={ BiLockAlt} color="#ffffff" h={5} w={5} mr={2}  />}
            {isPrivate === 'False' &&  <Icon as={ FiHash } color="#ffffff" h={5} w={5} mr={2} />}
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
  height:'23px',
  ml:'3px',
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
  },
  _active: {
    outline: "none",
    bg: "#29FFB9"
  }
}

export default ChannelHeader; 
