import React, { useMemo } from "react";
import { Box, Divider, HStack, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { IoMdClose } from "react-icons/io";
import { Image } from "@chakra-ui/image";
import ChannelImage from "../../../images/channelImg.png";
import { FiChevronRight, FiPhone, FiSearch, FiUserPlus } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { v4 } from "uuid";
import Icon from "@chakra-ui/icon";
import MoreOption from "./MoreOption";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/accordion";
import AddPeopleModal from "../../../createChannel/addPeopleModal";
import { useDisclosure } from "@chakra-ui/hooks";
import ArchiveChannelModal from "../ArchiveChannelModal/ArchiveChannelModal";

const ChannelDetails = ({ channelName="Announcements" }) => {
  const { 
    isOpen: isAddPeopleModalOpen, 
    onClose: onCloseAddPeopleModal, 
    onOpen: onOpenAddPeopleModal 
  } = useDisclosure()

  const { 
    isOpen: isArchiveModalOpen, 
    onClose: onCloseArchiveModal, 
    onOpen: onOpenArchiveModal 
  } = useDisclosure()

  const actions = {
    triggerArchiveChannel: onOpenArchiveModal,
    triggerMakeChannelPrivate: () => {},
    triggerDeleteChannel: () => {}
  }

  const options = useMemo(
    () => [
      {
        title: "Add",
        icon: <FiUserPlus color="#333333" />,
        id: v4(),
        onClick: onOpenAddPeopleModal,
      },
      {
        title: "Find",
        icon: <FiSearch color="#333333" />,
        id: v4(),
        onClick: () => {},
      },
      {
        title: "Call",
        icon: <FiPhone color="#333333" />,
        id: v4(),
        onClick: () => {},
      },
    ],
    []
  );

  const moreDetails = useMemo(
    () => [
      {
        id: v4(),
        name: "Admins",
        count: 1,
        icon: AiOutlineUser,
      },
      {
        id: v4(),
        name: "Members",
        count: 150,
        icon: AiOutlineUser,
      },
      {
        id: v4(),
        name: "Messages",
        count: 3576,
        icon: FiChevronRight,
      },
      {
        id: v4(),
        name: "Pinned Messages",
        count: 25,
        icon: FiChevronRight,
      },
      {
        id: v4(),
        name: "Files Shared",
        count: 50,
        icon: FiChevronRight,
      },
    ],
    []
  );

  return (
    <>
    <Box>
      <HStack justifyContent="space-between" px="21px" py="8px" bg="white">
        <Box>
          <Text fontWeight="bold">Details</Text>
          <Text color="#999999"># { channelName }</Text>
        </Box>
        <IconButton
          size="sm"
          aria-label="close"
          icon={<IoMdClose />}
          variant="ghost"
        />
      </HStack>
      <Box mt="2px">
        <Image src={ChannelImage} />
      </Box>
      <HStack
        justifyContent="space-between"
        px="2.8rem"
        pb="0.5rem"
        pt="1.38rem"
        mt="2px" 
        spacing={4}
        bg="white"
        borderTopLeftRadius="3px"
        borderTopRightRadius="3px"
      >
        {options.map((option) => (
          <Box key={option.id} textAlign="center">
            <IconButton
              aria-label={option.title}
              onClick={option.onClick}
              icon={option.icon}
              rounded="full"
              _hover={{ bgColor: "#00B87C", color: "white" }}
              mb="5px"
            />
            <Text fontSize="xs" fontWeight="bold">
              {option.title}
            </Text>
          </Box>
        ))}
        <Box textAlign="center">
          <MoreOption actions={actions} />
          <Text fontSize="xs" fontWeight="bold">
            More
          </Text>
        </Box>
      </HStack>

      <Box mt="2px" pb=".2rem" bg="white" borderTopLeftRadius="3px" borderTopRightRadius="3px">
        <Accordion allowMultiple>
          <AccordionItem border="none">
            <AccordionButton
              h="60px" 
              px="29px" 
              pt="1.2rem"
              _hover={{ bg: "none" }}
              _focus={{ outline: "none" }}
            >
              <Box flex="1" textAlign="left">
                <Text fontWeight="bold" fontSize="xs">
                  About
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={2}>
              <Box py="8px" px="30px">
                <Text color="gray.700" fontSize="1rem">
                  Topic
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Announcments
                </Text>
              </Box>
              <Divider orientation="horizontal" />
              <Box py="8px" px="30px">
                <Text color="gray.700" fontSize="1rem">
                  Description
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Any notifications and alerts shall be sent via this platform
                </Text>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box>
        {moreDetails.map((detail) => (
          <>
            <HStack
              key={detail.id}
              py="0.75rem"
              px="29px"
              mt="2px"
              h="60px"
              borderTopLeftRadius="3px"
              borderTopRightRadius="3px"
              justifyContent="space-between"
              bg="white"
            >
              <Text fontSize="xs" fontWeight="bold">
                {detail.name}
              </Text>
              <HStack>
                <Text fontSize="xs">{detail.count}</Text>
                <Icon aria-label={detail.name} as={detail.icon} />
              </HStack>
            </HStack>
          </>
        ))}
      </Box>
      <Box py="1rem" px="29px" h="56px" bg="white" mt="2px" borderTopLeftRadius="3px" borderTopRightRadius="3px">
        <Text fontWeight="bold" fontSize="sm" color="gray.400">
          Channel created Aug 30th 2021
        </Text>
      </Box>
    </Box>
    <AddPeopleModal isOpen={isAddPeopleModalOpen} onClose={onCloseAddPeopleModal} />
    <ArchiveChannelModal isOpen={isArchiveModalOpen} onClose={onCloseArchiveModal} />
    </>
  );
};

export default ChannelDetails;
