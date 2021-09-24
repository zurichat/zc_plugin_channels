import React from "react";
import { Box, HStack } from "@chakra-ui/layout";
import { Flex, Spacer, Avatar, AvatarGroup } from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";
import { Icon } from "@chakra-ui/icon";
import { BsChevronDown, BsHash } from "react-icons/bs";
import { IoChevronBackOutline } from "react-icons/io5";
import { CgPlayListSearch } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";



//avatar details
const avatars = [
  { name: "Ryan Florence", avi: "https://bit.ly/ryan-florence", index: 1 },
  { name: "Segun Adebayo", avi: "https://bit.ly/sage-adebayo", index: 2 },
  { name: "Kent Dodds", avi: "https://bit.ly/kent-c-dodds", index: 3 },
];

const ChannelDetailsContainer = () => {
  return (
    <Box width="100%" mt="5px">
        <Flex
            align="center"
            bgColor="#ffffff"
            height="8vh"
            boxShadow="xs"
            w="100%"
            p={3}
            letterSpacing="wide"
            justifyContent="space-between"
          >
          <Flex
              as="button"
              borderRadius="md"
              p="2"
              align="center"
              color="white"
              h={8}
              gridGap="15px"
              alignItems="center"
            >
                 
                <Flex flexDirection="column">
                    <Flex as="span" alignItems="center" fontSize="md" color="#000000" fontWeight="bold">
                    <Icon as={BsHash} color="#000000" w={5} h={5} />
                      Announcements
                    </Flex>
                    <Box
                      css={{
                        "@media (min-width: 600px)": {
                          display: "none",
                        }
                      }}
                      fontSize="12px"
                      color="#1D1C1D"
                      textAlign="left"
                      >30,000 members</Box>
                </Flex>
                  
                <Icon 
                  css={{
                      "@media (max-width: 600px)": {
                        display: "none",
                      }
                    }}
                  as={BsChevronDown} color="black" w={3} h={6} />
          </Flex>
          <Box>

          </Box>
              <Box
                css={{
                      "@media (max-width: 600px)": {
                        display: "none",
                      }
                    }}
                >
                  <Link to="/channel-detail">
                    <Flex p="4">
                        <HStack justifyContent="space-between">
                          <AvatarGroup size="xs" max={3}>
                            {avatars.map((avatar) => {
                              return <Avatar size="sm" name={avatar.name} src={avatar.avi} />;
                            })}
                          </AvatarGroup>
                          <Box as="span">30,000</Box>
                          <FiUserPlus color="#333333" />
                        </HStack>
                      </Flex>
                  </Link>
              </Box>
          </Flex>
          
    </Box>
  );
};

export default ChannelDetailsContainer;
