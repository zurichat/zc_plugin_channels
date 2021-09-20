import React, { useState } from "react";
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
import { FiPhoneCall } from "react-icons/fi";
import { CgMore } from "react-icons/cg";
import smileEmoji from '../images/emoji-smile.png'
// import UserProfileOnHover  from "./UserProfileOnHover";

const OnClickUserProfile = ({showProfile ,setShowProfile }) => {

  const data = {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d4a3/e257/f13a3cdb05ca74c9abf2933974335778?Expires=1631491200&Signature=JtDbDf-1BE7WkG0QO5i2-h-UhB8HF69Fr~QoJ0-wxPGvakH45P3R4xWFvrKRkpdqzcZWLl~aoWehGnocI-VTbns~3GT2rGw69rNnbWEOEdOlPf2RHkgceFJwzC6jma00vO1ROq3MMThgHdL0oVCLLmQV7XVgcq7RDUULJxrlrSqBffyTBjk-nuic0ONndBtT~nitN0WBUH8lKAoljTdErKZw0ucFGKC4xyfVdWGmT8w0~NRHvR6zy-3e48uxcvJ-8jIMFNJVlQ4jjnY1rXlnSWIataD0t6bJwmCGgGK7t-nADuJJtv9Vk9v31athvVG7z95o~naOyVOJabkpZoGIZw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    imageAlt: "profile-image",
    name: "Deryin Cutting",
    details: "View full profile",
    statusDetail: "Product Designer",
    time: "10:00AM",
    email: "adeekoEmmanuel@gmail.com"
  };

  const [toggle, setToggle] = useState(false)

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
                <Image src={smileEmoji}  pos='absolute' left='10rem'  top='17.8rem'  h='25px' w='25px' />
                
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
                      icon={<FiPhoneCall />}
                      background="#F0FDF9"
                      width="40px"
                      height="40px"
                      borderRadius="12px"
                      ml="24px"
                      _hover="none"
                      
                    />
                    <Text pos="relative" left={3}>
                      Call
                    </Text>
                  </Box>
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
                          </Box>
                      
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
           {toggle && MoreBtnOnHover()}
      </Container> }  
     </>
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
