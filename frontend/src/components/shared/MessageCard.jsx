import React, { useMemo, useState } from 'react'
import { Box, Flex, Text, Link, HStack, Square } from "@chakra-ui/layout";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { Menu, MenuItem, MenuButton, MenuList, MenuDivider } from "@chakra-ui/menu"
import { IconButton } from "@chakra-ui/react"
import { FiBookmark, FiCornerUpRight } from "react-icons/fi"
import { FaRegCommentDots } from "react-icons/fa"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { CgMoreVertical } from "react-icons/cg"

const replies = [
    { name: "Dan Abramov", profilePic: "https://bit.ly/dan-abramov", index: 1 },
    { name: "Dan Abramov", profilePic: "https://bit.ly/code-beast", index: 2 },
    { name: "Dan Abramov", profilePic: "https://bit.ly/ryan-florence", index: 3 },
    { name: "Dan Abramov", profilePic: "https://bit.ly/prosper-baba", index: 4 },
    { name: "Dan Abramov", profilePic: "https://bit.ly/sage-adebayo", index: 5 },
  ];

const MessageCard = ({ name, time, message, icon, isThread }) => {
  const [showOptions, setShowOptions] = useState(false)
    return (
      <Box 
        position="relative" 
        _hover={{ bg: "#C4C4C41A" }} 
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <HoverOptions show={showOptions} />
        <Flex flexWrap="nowrap" flexDir="row" p="15px" gridGap="10px">
          <Box>
            <Avatar name="Dan Abrahmov" src={icon} w="36px" h="36px" borderRadius="4px" />
          </Box>
          <Flex flexDir="column">
            <HStack flexWrap="nowrap" flexDir="row" spacing="8px">
              <Text fontSize="16px" fontWeight="900">
                {name}
              </Text>
              <Text fontSize="13px" color="#616061">
                {time}
              </Text>
            </HStack>
            <Box m="0px">
              <Text pr="40px">{message}</Text>
            </Box>
            {isThread && (
              <HStack spacing="5px" mt="5px">
                {
                  replies.slice(0, Math.min(4, replies.length))
                  .map((reply, index) => {
                    return (
                      <Avatar
                        key={`replies-avatar-${index}`}
                        w="24px"
                        h="24px"
                        borderRadius="4px"
                        name={reply.name}
                        src={reply.profilePic}
                      />
                    );
                  })
                }
                <HStack spacing="5px" alignItems="baseline">
                  <Link fontSize={["8px", "14px"]} color="#1264A3">{replies.length} Replies</Link>
                  <Text fontSize={["8px", "12px"]} color="#616061" cursor="pointer">View threads</Text>
                </HStack>
              </HStack>
            )}
          </Flex>
        </Flex>
      </Box>
    );
  };

const HoverOptions = ({ show }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const menuItemImpl = useMemo(() => [
    { label: "Turn off notifications for replies" },
    { divider: true },
    { label: "Mark as Unread", command: "U" },
    { label: "Remind me about this" },
    { divider: true },
    { label: "Send reply to this channel" },
    { label: "Share message", command: "S" },
    { label: "Copy Link" },
    { divider: true },
    { label: "Pin to channel", command: "P" },
    { label: "Edit Message", command: "E" }, 
  ], [])
  return (
    <HStack 
      px="9px" py="7px" 
      spacing="6px" 
      position="absolute" 
      top="-20px" right="10px" 
      border="1px solid #EBEBEB" borderRadius="3px" 
      bg="white"
      display={show || isMenuOpen ? "flex" : "none"}
    >
      <Square {...commonOptionStyle}>
        <HiOutlineEmojiHappy />
      </Square>
      <Square {...commonOptionStyle}>
        <FaRegCommentDots />
      </Square>
      <Square {...commonOptionStyle}>
        <FiCornerUpRight />
      </Square>
      <Square {...commonOptionStyle}>
        <FiBookmark />
      </Square>
      <Square {...commonOptionStyle}>
        <Menu placement="auto-end" isLazy lazyBehavior="unmount" onOpen={() => setMenuOpen(true)} onClose={() => setMenuOpen(false)}>
          <MenuButton
            as={IconButton}
            aria-label="More"
            icon={<CgMoreVertical />}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _focus={{ outline: "none" }}
            sx={{
              "&[data-active]": {
                background: "transparent"
              }
            }}
          />
          <MenuList border="0.5px solid #8B8B8B">
            {
              menuItemImpl.map(({ label, divider=false, ...rest }, index) => (
                <React.Fragment key={`menu-item-${index}`}>
                  { !divider ? <MenuItem {...rest} {...commonMoreOptionStyle}>{ label }</MenuItem> : <MenuDivider /> }
                </React.Fragment>
              ))
            }
            <MenuItem command="delete" {...deleteMoreOptionStyle}>Delete message</MenuItem>
          </MenuList>
        </Menu>
      </Square>
    </HStack>
)}
const commonOptionStyle = {
  size: "24px" ,
  cursor: "pointer",
  borderRadius: "2px",
  _hover: { bg: "#E7E7E7" }
}
const commonMoreOptionStyle = {
  _hover: { bg: "#00B87C", color: "white" },
  _focus: { bg: "#00B87C", color: "white" }
}
const deleteMoreOptionStyle = {
  _hover: { bg: "#ED5564", color: "white" },
  _focus: { bg: "#ED5564", color: "white" },
  color: "#ED5564"
}

export default MessageCard;