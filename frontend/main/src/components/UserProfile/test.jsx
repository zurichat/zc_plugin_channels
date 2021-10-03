import React, { useState } from "react";
// import Picker from "emoji-picker-react";

import {
  Box,
  IconButton,
  Image,
  Stack,
  Text,
  Divider,
  Container,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoNotificationsOffOutline } from "react-icons/io";
import { CgMore } from "react-icons/cg";
import smileEmoji from '../images/emoji-smile.png'
// import UserStatusSettings from './UserStatusSettings'
// import smileEmoji from '../images/emoji-smile.png';
import Picker from "emoji-picker-react";

// import UserProfileOnHover  from "./UserProfileOnHover";

const OnClickUserProfile = ({showProfile ,setShowProfile }) => {

  const data = {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d94/53d2/8f82ff6751f10eb228f58c9994598a9b?Expires=1633910400&Signature=Xhnnkxdar7-DRe3Z6MjbAro3Mf7I8~6gSN3X548sBShE2sCOd7FXWWqpU1vM~jPglJZcoefRPTgF0kP8U-8XRLBZ~gG2FYein3KHf7tPs02oYfc~lmSBHA7uKrP1-BaPpMIgiLNV1AaJU08qp~VQCljgWr7hWtzPM-dYk-4fKGzxpxPz3duO1nT8tkBsg0iviEUbtAV87kj7Kd7iZE0cN863zKca71gfyxAloV4co~MUeWsB4tTYlQkkLeeYAYBZM5mF~6m63UpTjKMYUWcP1h8SwmoBEsitlFqq4g5-zisKGTiwggJIU0sEsKhZCuCnjTykENLac7vgpvvoTlm7RQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    imageAlt: "profile-image",
    name: "Deryin Cutting",
    details: "View full profile",
    statusDetail: "Product Designer",
    time: "10:00AM",
    email: "adeekoEmmanuel@gmail.com"
  };

  const [toggle, setToggle] = useState(false)

  // handleClick = ()=>{


  // }
  const [showPicker, setShowPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState();

  const handleStatus = () => {
    setShowPicker(!showPicker)
  };
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <>
      {showProfile &&  <Container    >
            <Box  pos='relative'  left='41.9rem' top='3rem' zIndex='2' 
              bgColor='#00B87C' display="flex" borderRadius='1px'
                justifyContent="space-between" w='23rem' fontWeight="700" pl="14px" pr="10px">
            <Text color='white' pt='4px' > Profile </Text>
              <IconButton alignSelf='flex-end' colorScheme='white'
              background='none' onClick={() =>setShowProfile(false)}  _hover='none' icon={   <FaTimes  color='white' />} />
            </Box>

            <Box pos='relative' left='41.9rem' top='.8rem' h='41rem' w='21.8rem' bgColor='#ffffff'>
              
                <Image
                  src={data.imageUrl}
                  alt={data.imageAlt}
                  h='13rem'
                  w='17rem'
                  border='none'
                  borderRadius='3px'
                  pt='20px'
                  ml="auto"
                  mr="auto"
                  mt="30px"
                />

              <Stack spacing={2}>
                {/* Users' Name */}
                <Text alignSelf='center' fontSize='1.3rem' pt='10px' color='black' fontWeight='700' >{data.name}</Text>
                {/* Active indicator */}
                <Box  pos='absolute' left='15.7rem'  borderColor="gray.200" border='1px' top='14rem' borderRadius='50%' h='7px' w='7px' />
                {/* Users' Status detail */}
                <Text alignSelf='center' fontSize='.96rem' pos='absolute' m='0'  top='15.4rem'  color='gray' >{data.statusDetail}</Text>
                {/* Users' Image */}
                {/* <Box onClick={} ></BOX> */}
                <Box onClick={handleClick} cursor="pointer">
      {chosenEmoji ? chosenEmoji.emoji : <Image src={smileEmoji} alt={imageAlt} /> }
      {showPicker && <Picker onEmojiClick={onEmojiClick} /> 
      }
    </Box>
                <Image src={UserStatusSettings}  pos='absolute' left='10rem'  top='17.8rem'  h='25px' w='25px' />
                <Box onClick={handleStatus} cursor="pointer">
                    {chosenEmoji ? chosenEmoji.emoji :<Image src={smileEmoji}  h='25px' w='25px' />}
                    {showPicker && <Picker onEmojiClick={onEmojiClick} /> }
                </Box>
                
                <Box pos="relative" left="0.5rem" top="-15.5rem">
                  <Box
                    display="flex"
                    transform="scale(0.8)"
                    pos="absolute"
                    top="19.8rem"
                    left="3rem"
                    flexDir="column"
                  >
                    <IconButton
                      pos="relative"
                      left={2}
                      icon={<BiMessageRoundedDetail />}
                      background="#F0FDF9"
                      width="40px"
                      height="40px"
                      borderRadius="12px"
                      _hover="none"
                    />
                    <Text pos="relative" left={2}>
                      Message
                    </Text>
                  </Box>

                    <Box
                      pos="absolute"
                        transform="scale(0.8)"
                        top="19.8rem"
                        left="9rem"
                        display="flex"
                        flexDir="column"
                      >
                    <IconButton
                      pos="relative"
                      left={-7}
                      icon={<IoNotificationsOffOutline />}
                      background="#F0FDF9"
                      width="40px"
                      height="40px"
                      borderRadius="12px"
                      ml="24px"
                      _hover="none"
                      
                    />
                    <Text pos="relative" left={3}>
                      Mute
                    </Text>
                  {/* </Box>
                     <Box  pos='absolute' transform='scale(0.8)' top='19.8rem' left='9rem' display='flex' flexDir='column'>
                      <IconButton pos='relative' left={-7}
                        icon={<FiPhoneCall />}
                        background="#F0FDF9"
                        width="40px"
                        height="40px"
                        borderRadius="12px"
                        ml="24px"
                        _hover='none'
                      />
                          <Text pos='relative' left={3} >Call</Text>
                           </Box> */}
                      
                    <Box pos='absolute' justifyContent='center' transform='scale(0.8)' top='19.8rem' left='15rem' display='flex' flexDir='column'>
                      <IconButton pos='relative' left={-10}
                        icon={<CgMore />}
                        background="#F0FDF9"
                        width="40px"
                        height="40px"
                        borderRadius="12px"
                        ml="24px"
                        onClick={() => setToggle(!toggle)}
                      /> 
                          <Text pos='relative' left={-2}  >More</Text>
                    </Box> 
                <Box pos='relative' left='-1.8rem' top='23rem' transform='scale(0.89)'>
                    <Text pl='2rem' alignSelf='left' fontSize='11px' pt='28px' color='#828282' fontWeight='700' >Display Name</Text>
                    <Text pl='2rem' alignSelf='left' fontWeight='700' fontSize='15px' color='black' >{data.name}</Text>
                   
                    <Text pl='2rem' alignSelf='left' fontSize='11px' pt='28px' color='#828282' fontWeight='700' >Local Time</Text>
                    <Text pl='2rem' alignSelf='left' fontWeight='700' fontSize='15px' color='black' >{data.time}</Text>
                    
                    <Text pl='2rem'  alignSelf='left' fontSize='11px' pt='28px' color='#828282' fontWeight='700' >Email</Text>
                    <Text pl='2rem' alignSelf='left' fontWeight='900' fontSize='15px' color='#1264A3' >{data.email}</Text>
                </Box> 
            </Box>
            </Stack>
            </Box>
           </Box> 
           {toggle && MoreBtnOnHover()}
      </Container>
       }   
     </>
      }
  ); 
}
export default OnClickUserProfile;

function MoreBtnOnHover() {
  return (
    <> 
          <Box bgColor='white' w='12rem' shadow='2xl' h='6rem'borderRadius='3px' pos='absolute' left='80rem' top='29.5rem'>
              <Text color='#3A3A3A' pos='absolute' fontSize='.8rem' pl='.8rem' top='.8rem' >Veiw Profile</Text>
              <Divider mt='2.5rem' w='12rem'></Divider>
              <Text color='#3A3A3A' fontSize='.8rem' pt='.3rem' pl='.8rem'>Copy member ID</Text>
              <Text color='#3A3A3A' fontSize='.6rem' mt='.3rem' pl='.8rem'>UHGSUTHYS123456</Text>
          </Box>  
    </>
  );
}
