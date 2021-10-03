import React from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
const mainMessage = {
  name: "Sammy Hunter",
  time: "10:30 am",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus nunc arcu ornare iaculis.",
  avatar: "https://bit.ly/dan-abramov",
  replies: 20,
};
const MainMessage = () => {
  const { name, time, message, avatar, replies } = mainMessage;

  return (
    <Box
      p={4}
      w="95%"
      border="none"
      backgroundColor="white"
    >
      <Box d="flex">
        <Box pr={4} pt={1}>
          <Image
            borderRadius="3px"
            w="100px"
            h="50px"
            src={avatar}
            alt="user profile picture"
          />
        </Box>
        <Box pl={1}>
          <Flex>
            <Box fontWeight="bold" mr={2} color="rgba(36, 36, 36, 1)">
              {name}
            </Box>
            <Box fontWeight="light" color="rgba(193, 193, 193, 1)">
              {time}
            </Box>
          </Flex>
          <Text color="rgba(58, 58, 58, 1)" fontSize="15px" w="95%">
            {message}
          </Text>
        </Box>
      </Box>
      <Box fontWeight="light" color="rgba(154, 154, 158, 1)" pt={3}>
        
        <Text textAlign="left" display="flex" position="relative"
          //  _after={{content: "", position: "absolute", top: "50%", zIndex: "-2", display: "block", background: "#000", width: "200px" }}
        >
          {replies} replies 
        </Text>
      </Box>
    </Box>
  );
};

export default MainMessage;
