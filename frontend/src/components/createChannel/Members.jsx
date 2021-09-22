import React from "react";
import {
  Box,
  Text,
  Spacer,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { Divider, Heading } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { BiChevronDown } from "react-icons/bi";

const Members = () => {
  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
    xl: false,
  });

  return (
    <Box>
      <Box position="relative">
        <Divider />
        <HStack
          border="1px"
          borderRadius="2xl"
          borderColor={"gray.100"}
          py="6.5px"
          px={2}
          height="27px"
          fontSize="xs"
          position="absolute"
          top="-14px"
          left={isMobile ? "25%" : "45%"}
          bg="white"
        >
          <Text>Wednesday, September 18th</Text>
          <Spacer />
          <BiChevronDown />
        </HStack>
      </Box>

      <HStack spacing={5} py="38px" px="24px">
        <Avatar
          src="https://s3-alpha-sig.figma.com/img/e681/51b8/15187abf9e80c64eaabed22ad5ad502c?Expires=1632700800&Signature=FJ0lIAiKy7IWyArlymep5w3Xb6Vc7xeSL2L-JH~hp8c8uV~6hqzaKZID0iRTlZoyHHw9Q8nrsDRNCD869uuM1sOJGEX7~L-Id4oqcRb2jTCIbnkZl16lnQE0Puwu13-sjW9MkthKuk8gEHQCqaOKHcbFxSJY8MMh-9P5tV5B3Jsfki-iq1S3lH5twyIWFGO7pZkSkhA-3q9W3l9Mt7tNX1ExidZez3FAJoHNaufMx2lVh-LsMjaGbkFd6PIk8zIgRhXLJjGu5kFj~laxUawDPTz2dk39fCRToBQRn~BoVyh-e2IRqfcpj6pac80iB-T~IB-s2YMn6ms0gFDw2Mzd9A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          alt=""
          borderRadius="md"
          width="36px"
          height="36px"
        />
        <Box>
          <HStack>
            <Heading fontSize="15px" fontWeight={"black"}>
              Deyrin Cutting
            </Heading>
            <Text fontSize="12px" color="#616061">
              10:10 AM
            </Text>
          </HStack>
          <Text fontSize="15px">
            Joined #announcements channel with 400 others
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default Members;
