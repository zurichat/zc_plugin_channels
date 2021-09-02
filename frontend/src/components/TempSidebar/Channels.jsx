import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { Icon, Text, Flex, Center, Spacer, Image } from "@chakra-ui/react";
import {
  IoChevronDown,
  IoAddCircleOutline,
  IoLockClosed,
} from "react-icons/io5";

import { FaHashtag } from "react-icons/fa";
import avatar from "./assets/Avatar.jpg";

const Channels = () => {
  const [channelsDropDown, setChannelsDropDown] = useState(false);
  const [dmDropDown, setDMDropDown] = useState(false);  

  const handleChannelsDropDown = (e) => {
    e.preventDefault();
    setChannelsDropDown(!channelsDropDown);
  };
  const handleDMDropDown = (e) => {
    e.preventDefault();
    setDMDropDown(!dmDropDown);
  };

  return (
    <Box
      w="20%"
      paddingY="1em"
      fontSize="15px"
      lineHeight="18px"
    >
      {/* Channels section */}
      <Box width="75%" margin="0 auto">
        <Flex cursor="pointer" color="#8B8B8B" marginBottom="0.5rem">
          <Flex alignItems="center" onClick={handleChannelsDropDown}>
            <Icon as={IoChevronDown} marginRight="10px" />
            <Text>Channels</Text>
          </Flex>
          <Spacer />
          <Link to='/add-channel'>
            <Icon as={IoAddCircleOutline} fontSize="1.4rem" />
          </Link>
          
        </Flex>

        {channelsDropDown && (
          <Box marginLeft="5%">
            <Flex cursor="pointer">
              <Link to="/announcements">
                <Text color="#00B87C">
                  <Center>
                    <Icon as={FaHashtag} margin="10px" fontSize="1rem" />
                    Announcements
                  </Center>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer">
              <Link to="/designers">
                <Text color="#8B8B8B">
                  <Center>
                    <Icon as={IoLockClosed} margin="10px" fontSize="1rem" />
                    Designers
                  </Center>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer">
              <Link to="/games">
                <Text color="#8B8B8B">
                  <Center>
                    <Icon as={FaHashtag} margin="10px" fontSize="1rem" />
                    Games
                  </Center>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer">
              <Link to="/developers">
                <Text color="#8B8B8B">
                  <Center>
                    <Icon as={IoLockClosed} margin="10px" fontSize="1rem" />
                    Developers
                  </Center>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer">
              <Link to="/random">
                <Text color="#8B8B8B">
                  <Center>
                    <Icon as={FaHashtag} margin="10px" fontSize="1rem" />
                    Random
                  </Center>
                </Text>
              </Link>
            </Flex>

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
          <Icon as={IoAddCircleOutline} fontSize="1.3rem" />
        </Flex>

        {dmDropDown && (
          <Box marginLeft="5%">
            <Flex cursor="pointer" marginBottom="1em">
              <Link to="/message-board">
                <Text color="#8B8B8B">
                  <Flex>
                    <Image
                      src={avatar}
                      borderRadius="full"
                      w="10"
                      marginRight="10px"
                    />
                    <Center>John Doe</Center>
                  </Flex>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer" marginBottom="1em">
              <Link to="/message-board">
                <Text color="#8B8B8B">
                  <Flex>
                    <Image
                      src={avatar}
                      borderRadius="full"
                      w="10"
                      marginRight="10px"
                    />
                    <Center>John Doe</Center>
                  </Flex>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer" marginBottom="1em">
              <Link to="/message-board">
                <Text color="#8B8B8B">
                  <Flex>
                    <Image
                      src={avatar}
                      borderRadius="full"
                      w="10"
                      marginRight="10px"
                    />
                    <Center>John Doe</Center>
                  </Flex>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer" marginBottom="1em">
              <Link to="/message-board">
                <Text color="#8B8B8B">
                  <Flex>
                    <Image
                      src={avatar}
                      borderRadius="full"
                      w="10"
                      marginRight="10px"
                    />
                    <Center>John Doe</Center>
                  </Flex>
                </Text>
              </Link>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Channels;
