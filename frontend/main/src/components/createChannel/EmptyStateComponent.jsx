import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { BiUserPlus } from "react-icons/bi";
import { useDisclosure } from "@chakra-ui/react";
import AddPeopleModal from "./addPeopleModal";
import { Circle, HStack } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { FiHash } from "react-icons/fi";
import { useBreakpointValue } from "@chakra-ui/media-query";
import Members from "./Members";
import { useSelector } from "react-redux";
import UtilityService from "../../utils/utils";
import { Center } from "@chakra-ui/react"

const EmptyStateComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    channelsReducer: { channelDetails },
  } = useSelector((state) => state);

  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
    xl: false,
  });

  return (
    <Box width="100%" m="auto" fontSize="16px">
      <AddPeopleModal isOpen={isOpen} onClose={onClose} />
      <Center fontSize={{ base: "14px", md: "14px", lg: "15px" }} p={[2, 7, 6, 0]}>
        <HStack direction={["column", "row"]}>
          <Text color="#2B2B2B" fontweight='700' fontSize="15px" lineHeight='30px' paddingTop='18px'>
            This is the very beginning of the{" "}
            <Link
              color="#0562ed"
              fontWeight="700"
              mr="0.1rem"
              textTransform="capitalize"
              fontSize='15px'
            >
              #{channelDetails.name}
            </Link>
            channel
            <Link color="#0562ed" ml='2px' fontWeight="700" fontweight='700' textTransform="capitalize">
              @{channelDetails.owner}
            </Link>{" "}
            created this channel on{" "}
            {UtilityService.formatDate(channelDetails.created_on, "MMM Do")}.
          </Text>
        </HStack>
      </Center>
      <Center color="white" >
        <Box w={['40%', '30%', '30%', '15%']}
          mt={['0', '-4%', '0 ', '5%']}
          mb={['5%', '5%', '5%', '1%']}
          height='40px'
          border="1px solid #00B87C"
          marginTop='30px'>
          <HStack direction={["column", "row"]}
            spacing="4px"
            padding='10px'
            justifyContent='center'
            margin='auto'>
            <Icon as={BiUserPlus} color='#00B87C' />
            <Text cursor="pointer" color='#00B87C' onClick={onOpen} fontSize='12px' fontWeight='700'>
              Add Members
            </Text>
          </HStack>
        </Box>
      </Center>
    </Box>
  );
};

export default EmptyStateComponent;
