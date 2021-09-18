import React, { useEffect, useState } from "react";
import { Box, HStack } from "@chakra-ui/layout";
import { Flex, Spacer, Avatar, AvatarGroup, Button, Divider, IconButton, Image } from "@chakra-ui/react";
import { BiChevronDown, BiChevronLeft } from "react-icons/bi";
import { Icon } from "@chakra-ui/icon";
import { IoMdAdd } from "react-icons/io";
import { FiHash, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { TiPin } from 'react-icons/ti'
import searchImage from "../../assets/search.png";
import infoImage from "../../assets/info.png";
import APIService from "../../utils/api";
import appActions from "../../redux/actions/app"

//avatar details(Just a placeholder)
const avatars = [
  { name: "Kent Dodds", avi: "https://bit.ly/kent-c-dodds", index: 1 },
  { name: "Segun Adebayo", avi: "https://bit.ly/sage-adebayo", index: 2 },
  { name: "Christian Nwamba", avi:"https://bit.ly/code-beast",index: 3 },
];

const ChannelHeader = () => {

  const [pinnedMessages, setPinnedMessages] = useState([]);

  const numberOfMembers = 30000;//just a placeholder
  //const numberOfPinnedMsgs = 3;
  const channelsName = 'Announcements';//just a placeholder

  const getPinnedMessages = async () => {
    const orgId = 1;
    const channelId = "613f70bd6173056af01b4aba"; // Hardcoded value to for channelId in org with id 1
    const res = await APIService.getPinnedMessages(orgId, channelId)
    setPinnedMessages(res.data)
  };

  useEffect(() => {
    try {
      getPinnedMessages()
    } catch (err) {
      appActions._alert("error")
    }
  }, [])

  return (
    <Box width="100%" mt="5px">
      <Flex flexShrink={0} ml="1px" align="center" bgColor="#00B87C" height="44px" boxShadow="xs" maxWidth='1172px' w="100%" sx={{"@media screen and (max-width: 768.5px)": {display: "none",},}}>
        <Link to="/channel-detail">  
          <Button size='sm' bgColor='#00B87C' _focus={{ bg: "#00C384" }} flexShrink={0} borderRadius="8px" ml={5} width='80%' height='30px' p="4" align="center"  _hover={{ bg: "#00C384" }} >
            <Icon as={ FiHash } color="#ffffff" h={5} w={5} mr={2}  />
            <Box as="span" letterSpacing='wide' lineHeight='32px' fontSize="17.5px" color="#ffffff" fontWeight="501" mr={1}>
              {channelsName}
            </Box> 
            <Icon as={BiChevronDown} color="#ffffff" w={6} h={5} />
          </Button>
        </Link> 
        <Spacer />
        <Link to="/channel-detail"> 
          <Flex p="4">
          <Spacer/>
            <Button variant='outline' bgColor='#ffffff' size='sm' width="85%" borderRadius='4px'  height='33px' mr='0.5%'>
                <AvatarGroup ml='1px' size="sm" max={3} spacing='-2' >
                  {avatars.map((avatar, index) => {
                    return <Avatar key={`ch-hd-${index}`} borderRadius="5px" borderWidth='2px' borderColor='#ffffff' height='31px' width='31px' name={avatar.name} src={avatar.avi} />;
                  })}
                </AvatarGroup>
                <Box as="span" fontWeight='medium' mr='8px' ml='5px'>{numberOfMembers}</Box>
            </Button>
          </Flex>
        </Link>
      </Flex>
      <Divider orientation="horizontal" sx={{"@media screen and (max-width: 768.5px)": { display: "none",},}} />
      <Box sx={{"@media screen and (max-width: 768.5px)": { display: "none",},}}>
        <HStack bg="#E1FDF4" px="1rem" py="5px" spacing="5px"> 
          { pinnedMessages.length > 0 && <Button {...pinnedAndBookmarkButtonStyle} leftIcon={<TiPin size={16} transform="scale(-1, 1)" color="#1D1C1D" />}>{pinnedMessages.length} Pinned</Button> }
          <Button {...pinnedAndBookmarkButtonStyle} leftIcon={<IoMdAdd size={16} color="#1D1C1D" />}>Add a bookmark</Button>        
        </HStack>
      </Box>
      
      <Flex ml="3px" align="center" bgColor="#00B87C" height="75.92px" boxShadow="xs" maxWidth='1172px' w="100%" sx={{"@media screen and (min-width: 768.5px)": {display: "none",}}}>
        <Icon as={ BiChevronLeft } color="#ffffff" h={10} w={10} ml={2}  />
          <Flex ml={2}  alignContent='center' flexDir='column'>
            <Flex align='center' flexDir='row'>
              <Icon as={ FiHash } color="#ffffff" h={5} w={5} mr={1}  />
              <Box as="span" letterSpacing='wide'  fontSize="18px" color="#ffffff" fontWeight="501" mr={1} >
                Announcements
              </Box>
            </Flex>
            <Box as='span' fontSize='12px'  fontWeight='400' ml='2%' color='#ffffff'>{numberOfMembers} members</Box>
          </Flex> 
          <Spacer /> 
          <Flex p="4" align='center'>
            <HStack spacing='10px' justifyContent='space-between'>
            <IconButton variant='unstyled' size='sm' icon={<Image src={searchImage}  color='#ffffff'/>} aria-label="search"></IconButton>
            <IconButton variant='unstyled' size='sm' icon={<Image src={infoImage}  color='#ffffff'/>} aria-label='channel-details' color='#ffffff' /></HStack>
          </Flex>
      </Flex> 
    </Box> 
  );
};

const pinnedAndBookmarkButtonStyle = {
  bg: "#BCF9E6",
  px: "10px",
  py: "4.5px",
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
