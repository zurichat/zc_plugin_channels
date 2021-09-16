import React from "react";
import { Box } from "@chakra-ui/layout";
import {
  Text,
  Stack,
  Image,  Button, Divider
} from "@chakra-ui/react";
import smileEmoji from '../images/emoji-smile.png'
// import OnClickUserProfile from "./OnClickUserProfile";




 function UserProfileOnHover  ({setShowProfile}) {
  const data = {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d4a3/e257/f13a3cdb05ca74c9abf2933974335778?Expires=1631491200&Signature=JtDbDf-1BE7WkG0QO5i2-h-UhB8HF69Fr~QoJ0-wxPGvakH45P3R4xWFvrKRkpdqzcZWLl~aoWehGnocI-VTbns~3GT2rGw69rNnbWEOEdOlPf2RHkgceFJwzC6jma00vO1ROq3MMThgHdL0oVCLLmQV7XVgcq7RDUULJxrlrSqBffyTBjk-nuic0ONndBtT~nitN0WBUH8lKAoljTdErKZw0ucFGKC4xyfVdWGmT8w0~NRHvR6zy-3e48uxcvJ-8jIMFNJVlQ4jjnY1rXlnSWIataD0t6bJwmCGgGK7t-nADuJJtv9Vk9v31athvVG7z95o~naOyVOJabkpZoGIZw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    imageAlt: "profile-image",
    name: "Deryin Cutting",
    details: "View full profile",
    statusDetail: "Product Designer",
    time: "10:00AM",
  };

  

  return (
        <Box
          maxW="58rem"
          w='19rem'
          h='35rem'
          top='4rem'
          pos='absolute'
          left='20rem'
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          m="6"
          transform='scale(0.8)'
          shadow='md'
        >
          <Stack  spacing={20}>
           <Image h='190px'w='100%' src={data.imageUrl}></Image>
            <Box  pos='absolute' left='11.2rem' border='1px' top='10.8rem' borderRadius='50%' h='9px' w='9px' />
            <Stack pt='1rem' pl='1rem'>
            <Text fontSize='1.3rem' fontWeight='1000' fontStyle='Lato' pos='absolute' pl='.5rem' top='15rem' >{data.name}</Text>
        
            <Text fontSize='.96rem' fontStyle='Lato' color='gray'  pos='absolute' pl='.5rem' top='16.4rem' >{data.statusDetail}</Text>

            
            <Button type='button' onClick={() => setShowProfile(true)} fontSize='.96rem'  fontStyle='Lato' color='#1264A3' pos='absolute' pl='.5rem' top='19rem' >{data.details} </Button>

            <Box  bgColor='red' w='12rem' shadow='2xl' h='6rem'borderRadius='3px' pos='absolute' left='80rem' top='29.5rem'>
                <Text color='#3A3A3A' pos='absolute' fontSize='.8rem' pl='.8rem' top='.8rem' >Veiw Profile</Text>
                <Divider mt='2.5rem' w='12rem'></Divider>
                <Text color='#3A3A3A' fontSize='.8rem' pt='.3rem' pl='.8rem'>Copy member ID</Text>
                <Text color='#3A3A3A' fontSize='.6rem' mt='.3rem' pl='.8rem'>UHGSUTHYS123456</Text>
            </Box>


                    
            <Text fontSize='.96rem' fontStyle='Lato' color='gray'  pos='absolute' pl='.5rem' top='21rem' >Status</Text>
            <Image src={smileEmoji}  pos='absolute' left='2rem'  top='23rem'  h='25px' w='25px' />
            <Text fontSize='.96rem' fontStyle='Lato' color='gray'  pos='absolute' pl='.5rem' top='26rem' >Local Time</Text>
            <Text fontSize='.96rem' fontStyle='Lato' fontWeight='bold' color='black'  pos='absolute' pl='.5rem' top='27.8rem' >{data.time}</Text>
            <Box display='flex' pos='absolute'   w='240px'  top='30.4rem'  >

                    <Button
                      bg="#00B87C"
                      color="white"
                      _hover='none'
                      m='10px'
                      h='32px'
                      borderRadius='3px'
                      w="270px"> Message </Button>
                  
                    <Button
                      color="#00B87C"
                      _hover='none'
                      h='32px'
                      background='none'
                      borderRadius='3px'
                      border='1px'
                      borderColor='#00B87C'
                      w="270px"
                      m='10px'> Call </Button>
              </Box>
            </Stack>
          </Stack>
         
        </Box>
    
   );
 };

 export default UserProfileOnHover;
