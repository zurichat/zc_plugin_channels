import React from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";

const Reply = (props) => {
  const { name, time, message, avatar } = props;

  return (
    <Box d="flex" p={2}>
      <Box pr={4} pt={1}>
        <Image
          borderRadius="full"
          boxSize="36px"
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
        <Text color="rgba(58, 58, 58, 1)" w="260px">
          {message}
        </Text>
      </Box>
    </Box>
  );
};

const replies = [
  {
    name: "Sammy Hunter",
    time: "15 mins ago",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.",
    avatar: "https://bit.ly/dan-abramov",
    id: 1,
  },
  {
    name: "Detty Brymz",
    time: "10 mins ago",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.",
    avatar: "https://bit.ly/code-beast",
    id: 2,
  },
  {
    name: "Ekun Omo",
    time: "7 mins ago",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.",
    avatar: "https://bit.ly/ryan-florence",
    id: 3,
  },
  {
    name: "Dan Abrahmov",
    time: "10:10pm",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.",
    avatar: "https://bit.ly/dan-abramov",
    id: 4,
  },
];

const ThreadReplies = () => {
  return (
    <Box
      w="360px"
      border="1px solid rgba(180, 180, 180, .5)"
      borderRadius="3px"
    >
      {replies && replies.map((reply) => <Reply key={reply.id} {...reply} />)}
    </Box>
  );
};

export default ThreadReplies;
