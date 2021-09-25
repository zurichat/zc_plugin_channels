import { Box, Flex, Text, Image } from "@chakra-ui/react";
import Download from "../../assets/download.svg"
import Upload from "../../assets/upload.svg"
import Cancel from "../../assets/cancel.svg"
import Options from "../../assets/options.svg"
import Picture from "../../assets/image.jpg"
import Profile from "../../assets/profile.jpg"

function ThumbnailModal({ imageUrl, clicked }) {
  return (
    <Box
      pos="fixed"
      zIndex={50}
      width="90%"
      py={1}
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      background="white"
      borderRadius={4}
    >
      <Flex align="center" borderBottom="1px" width="100%" px="20px" py="10px">
        <Flex mr="auto">
          <Image src={Profile} alt="" height="30px" mr="9px" />
          <Box>
            <Text fontSize={10} fontWeight="bold">image.png</Text>
            <Text fontSize={10}>Kevin Aug 25th at 6:30 AM</Text>
          </Box>
        </Flex>
        <Flex align="center"  justifyContent="space-around">
            <Image src={Download} cursor="pointer" height="20px" mx="10px" width="20px" alt="" />
            <Image src={Upload} cursor="pointer" height="20px" mx="10px" width="20px" alt="" />
            <Image src={Options} cursor="pointer" height="20px"  mx="10px" width="20px" alt="" />
            <Box height="20px" borderRight="1px"></Box>
            <Image onClick={clicked} src={Cancel} cursor="pointer" height="20px"  mx="10px" width="20px" alt="" />
        </Flex>
      </Flex>
 
      <Image src={Picture}  alt="" mx="30px" height="350px" display="block" m="auto" my="10"/>
    </Box>
  );
}

export default ThumbnailModal;
