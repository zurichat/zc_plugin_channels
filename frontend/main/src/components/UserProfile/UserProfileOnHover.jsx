import React from "react";
import { Box } from "@chakra-ui/layout";
import {
  Text,
  Stack,
  Image, Link, Button
} from "@chakra-ui/react";
import smileEmoji from '../images/emoji-smile.png'






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
          h='34rem'
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
           <Image h='185px'w='100%' src={data.imageUrl}></Image>
            <Box  pos='absolute' left='11.2rem' border='1px' top='9.8rem' borderRadius='50%' h='9px' w='9px' />
            <Stack pt='1rem' pl='1rem'>
            <Text fontSize='1.3rem' fontWeight='1000' fontStyle='Lato' pos='absolute' pl='.5rem' top='14rem' >{data.name}</Text>
        
            <Text fontSize='.96rem' fontStyle='Lato' color='gray'  pos='absolute' pl='.5rem' top='15.4rem' >{data.statusDetail}</Text>

            
            <Link type='button' onClick={() => setShowProfile(true)} fontSize='.96rem'  fontStyle='Lato' color='#1264A3' pos='absolute' pl='.5rem' top='18rem' >{data.details} </Link>



                    
            <Text fontSize='.96rem' fontStyle='Lato' color='gray'  pos='absolute' pl='.5rem' top='20rem' >Status</Text>
            <Image src={smileEmoji}  pos='absolute' left='2rem'  top='22rem'  h='25px' w='25px' />
            <Text fontSize='.96rem' fontStyle='Lato' color='gray'  pos='absolute' pl='.5rem' top='25rem' >Local Time</Text>
            <Text fontSize='.96rem' fontStyle='Lato' fontWeight='bold' color='black'  pos='absolute' pl='.5rem' top='26.8rem' >{data.time}</Text>
            <Box display='flex' pos='absolute'   w='240px'  top='30.4rem'  >

                    <Button pos='relative' top='-1.8rem'
                      color="#00B87C"
                      _hover={{ bg: "#00B87C", 
                                color: "white"      }}
                      border='1px'
                      colorScheme='none'
                      borderColor='#00B87C'
                      m='10px'
                      h='32px'
                      borderRadius='3px'
                      w="270px"> Message </Button>
                  
                    <Button pos='relative' top='-1.8rem'
                      color="#00B87C"
                      _hover={{ bg: "#00B87C", 
                                color: "white"      }}
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
