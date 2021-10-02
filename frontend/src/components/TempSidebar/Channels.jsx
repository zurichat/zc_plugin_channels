import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { Icon, Text, Flex, Center, Spacer, Image } from "@chakra-ui/react";
import {
  IoChevronDown,
  IoAddCircleOutline,
  IoLockClosed,
} from "react-icons/io5";
import { FaHashtag, FaHourglassEnd } from "react-icons/fa";
import avatar from "./assets/Avatar.jpg";
import { v4 } from "uuid";

const Channels = () => {
  // states
  const [channelsDropDown, setChannelsDropDown] = useState(false);
  const [dmDropDown, setDMDropDown] = useState(false);
  const [channels, setChannels] = useState([
    {
      id: v4(),
      link: "/announcements",
      icon: FaHashtag,
      text: "announcements",
      color: "#00B87C",
    },
    {
      id: v4(),
      link: "/designers",
      icon: IoLockClosed,
      text: "designers",
      color: "#8B8B8B",
    },
    {
      id: v4(),
      link: "/games",
      icon: FaHashtag,
      text: "games",
      color: "#8B8B8B",
    },
    {
      id: v4(),
      link: "/developers",
      icon: IoLockClosed,
      text: "developers",
      color: "#8B8B8B",
    },
    {
      id: v4(),
      link: "/random",
      icon: FaHashtag,
      text: "random",
      color: "#8B8B8B",
    },
  ]);
  const [dms, setDms] = useState([
    { id: v4(), link: "/message-board", img: avatar, text: "John Doe" },
    { id: v4(), link: "/message-board", img: avatar, text: "Nazaa__" },
    {
      id: v4(),
      link: "/message-board",
      img: avatar,
      text: "Augustus Waters",
    },
    { id: v4(), link: "/message-board", img: avatar, text: "Hazel Grace" },
  ]);
  // --end of states

  // click handlers
  const handleChannelsDropDown = (e) => {
    e.preventDefault();
    setChannelsDropDown(!channelsDropDown);
    setDMDropDown(false);
  };
  const handleDMDropDown = (e) => {
    e.preventDefault();
    setDMDropDown(!dmDropDown);
    setChannelsDropDown(false);
  };

  return (
    <Box w="20%" paddingY="1em" fontSize="15px" lineHeight="18px" allowToggle>
      {/* Channels section */}
      <Box width="75%" margin="0 auto">
        <Flex cursor="pointer" color="#8B8B8B" marginBottom="0.5rem">
          <Flex alignItems="center" onClick={handleChannelsDropDown}>
            <Icon as={IoChevronDown} marginRight="10px" />
            <Text>Channels</Text>
          </Flex>
          <Spacer />
          <Link to="/add-channel">
            <Icon as={IoAddCircleOutline} fontSize="1.4rem" />
          </Link>
        </Flex>

        {channelsDropDown && (
          <Box marginLeft="5%">
            {channels.map((channel) => (
              <Flex cursor="pointer" key={channel.id} color={channel.color}>
                <Link to={channel.link}>
                  <Text>
                    <Center>
                      <Icon as={channel.icon} margin="10px" fontSize="1rem" />
                      {channel.text}
                    </Center>
                  </Text>
                </Link>
              </Flex>
            ))}

            {/* add channel btn */}
            <Flex cursor="pointer">
              <Link to="/add-channel">
                <Text color="#8B8B8B">
                  <Center>
                    <Icon
                      as={IoAddCircleOutline}
                      margin="10px"
                      fontSize="1rem"
                    />
                    Add channel
                  </Center>
                </Text>
              </Link>
            </Flex>
          </Box>
        )}
      </Box>

      {/* Direct messages section */}
      <Box width="75%" margin="1rem auto">
        <Flex cursor="pointer" color="#8B8B8B" marginBottom="0.5rem">
          <Flex alignItems="center" onClick={handleDMDropDown}>
            <Icon as={IoChevronDown} marginRight="10px" />
            <Text>Direct messages</Text>
          </Flex>
          <Spacer />
          <Icon as={IoAddCircleOutline} fontSize="1.4rem" h="6" />
        </Flex>

        {dmDropDown && (
          <Box marginLeft="5%">
            {dms.map((dm) => (
              <Flex cursor="pointer" marginBottom="1em" key={dm.id}>
                <Link to={dm.link}>
                  <Text color="#8B8B8B">
                    <Flex>
                      <Image
                        src={dm.img}
                        borderRadius="full"
                        w="10"
                        marginRight="10px"
                      />
                      <Center>{dm.text}</Center>
                    </Flex>
                  </Text>
                </Link>
              </Flex>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Channels;
