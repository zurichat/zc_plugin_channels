import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { Icon, Text, Flex, Center, Spacer } from "@chakra-ui/react";
import { IoChevronDown } from "react-icons/io5";
import { AiOutlineFile } from "react-icons/ai";
import { FiMessageCircle, FiPieChart } from "react-icons/fi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsFileEarmarkText, BsFileText } from "react-icons/bs";
// import { EditIcon } from '@chakra-ui/icons'

export default function ZuriChat() {
  const [zuriChatDropDown, setZuriChatDropDown] = useState(false);

  const handleZuriChatDropDown = (e) => {
    e.preventDefault(e);

    setZuriChatDropDown(!zuriChatDropDown);
  };
  return (
    <Box w="25%" paddingY="1rem" fontSize="20px" lineHeight="15px">
      {/* zuri section */}
      <Box>
        <Flex cursor="pointer" color="#8B8B8B" marginBottom="1rem">
          <Flex alignItems="center" onClick={handleZuriChatDropDown}>
            <Icon as={IoChevronDown} marginRight="12px" />
            {/* <Text>ZURI CHAT</Text> <EditIcon bg='#00B87C' ml='10px' color='#fff' /> */}
            <Spacer />
          </Flex>
        </Flex>

        {zuriChatDropDown && (
          <Box marginLeft="5%">
            <Flex cursor="pointer">
              <Link to="/insight">
                <Text color="#00B87C">
                  <Center>
                    <Icon as={FiPieChart} margin="10px" fontSize="1rem" />
                    Insight
                  </Center>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer">
              <Link to="/threads">
                <Text color="#00B87C">
                  <Center>
                    <Icon
                      as={BiMessageRoundedDetail}
                      margin="10px"
                      fontSize="1rem"
                    />
                    Threads
                  </Center>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer">
              <Link to="/all-dms">
                <Text color="#00B87C">
                  <Center>
                    <Icon as={FiMessageCircle} margin="10px" fontSize="1rem" />
                    All DMs
                  </Center>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer">
              <Link to="/drafts">
                <Text color="#00B87C">
                  <Center>
                    <Icon as={BsFileText} margin="10px" fontSize="1rem" />
                    Drafts
                  </Center>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer">
              <Link to="/files">
                <Text color="#00B87C">
                  <Center>
                    <Icon as={AiOutlineFile} margin="10px" fontSize="1rem" />
                    Files
                  </Center>
                </Text>
              </Link>
            </Flex>

            <Flex cursor="pointer">
              <Link to="/files">
                <Text color="#00B87C">
                  <Center>
                    <Icon
                      as={BsFileEarmarkText}
                      margin="10px"
                      fontSize="1rem"
                    />
                    Files
                  </Center>
                </Text>
              </Link>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
}
