import React from "react";
import { Box, IconButton, Image, Button, Stack, Text, Divider, Container } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import userimage from "../../assets/Ellipse-12.png";

function OnclickuserProfile() {
  return (
    <Container >
        <Box pos='absolute'  left='72rem' top='1rem' bgColor='#ffffff' display="flex" borderRadius='1px'  justifyContent="space-between" w='21rem' fontWeight="700" pl="14px" pr="10px">
         <Text color='black' pt='4px' > Profile </Text>
          <IconButton alignSelf='flex-end' background='none' _hover='none' icon={  <FaTimes />} />
        </Box>

        <Box pos='absolute' left='72rem' top='4.4rem' h='42rem' w='21rem' bgColor='#ffffff'>
          <Stack h='37rem'>
            <Image
              src={userimage}
              alt="My-images"
              h='12rem'
              w='12rem'
              border='none'
              ml="auto"
              mr="auto"
              mt="40px"
            />
            <Text alignSelf='center' pt='10px' color='black' fontWeight='700' >Adeeko Emmanuel</Text>
            <Text alignSelf='center' m='0' fontSize='10px' color='gray' >@Adeeko246</Text>
            <Divider alignSelf='center' w='20rem' />
            <Box   alignSelf='center' display='flex' transform='scale(0.8)'>
                <IconButton
                    icon={<FaRegComment />}
                    background="#E9E9e9"
                    width="40px"
                    height="40px"
                    borderRadius="12px"
                    _hover='none'
                  />
                  <IconButton
                    icon={<FaRegFolder />}
                    background="#E9E9e9"
                    width="40px"
                    height="40px"
                    borderRadius="12px"
                    ml="24px"
                    _hover='none'
                  />
                  <IconButton
                    icon={<FaTwitch />}
                    background="#00B87C"
                    width="40px"
                    height="40px"
                    borderRadius="12px"
                    ml="24px"
                    _hover='none'
                  />
            </Box>
            <Box >
                <Text pl='2rem' alignSelf='left' fontSize='13px' pt='8px' color='#A6A6A6' fontWeight='700' >Role</Text>
                <Text pl='2rem' alignSelf='left' fontSize='10px' color='black' >UI/UX Designer</Text>
                <Divider pt='5px' alignSelf='left' w='24rem' />
                <Text pl='2rem'  alignSelf='left' fontSize='13px' pt='8px' color='#A6A6A6' fontWeight='700' >Email</Text>
                <Text pl='2rem' alignSelf='left' fontSize='10px' color='black' >AdeekoEmmanuel@gmail.com</Text>
                <Divider pt='5px' alignSelf='left' w='24rem' />
                <Text pl='2rem' alignSelf='left' fontSize='13px' pt='8px' color='#A6A6A6' fontWeight='700' >Mobile Number</Text>
                <Text pl='2rem' alignSelf='left' fontSize='10px' color='black' >08012345678</Text>
            </Box>
            <Button
                  backgroundColor="#00B87C"
                  variant="link"
                  width="180px"
                  height="77px"
                  top='1rem'
                  alignSelf='center'
                  mt="5px"
                  color="#FFFFFF;">
                  Other Activities
            </Button>
            
            


          </Stack>
        </Box>
        






    </Container>

     
  );
}

export default OnclickuserProfile;
