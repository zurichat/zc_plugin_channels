import React from "react";
import { Box, Heading, Spacer } from "@chakra-ui/layout";
import { Button, Divider } from "@chakra-ui/react";
import {
  Text,
  IconButton,
  Avatar,
  HStack,
  Stack,
  Center,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { FiVideo, FiFolder } from "react-icons/fi";
import { createIcon } from "@chakra-ui/icons";

const UserProfileOnHover = () => {
  const data = {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/d4a3/e257/f13a3cdb05ca74c9abf2933974335778?Expires=1631491200&Signature=JtDbDf-1BE7WkG0QO5i2-h-UhB8HF69Fr~QoJ0-wxPGvakH45P3R4xWFvrKRkpdqzcZWLl~aoWehGnocI-VTbns~3GT2rGw69rNnbWEOEdOlPf2RHkgceFJwzC6jma00vO1ROq3MMThgHdL0oVCLLmQV7XVgcq7RDUULJxrlrSqBffyTBjk-nuic0ONndBtT~nitN0WBUH8lKAoljTdErKZw0ucFGKC4xyfVdWGmT8w0~NRHvR6zy-3e48uxcvJ-8jIMFNJVlQ4jjnY1rXlnSWIataD0t6bJwmCGgGK7t-nADuJJtv9Vk9v31athvVG7z95o~naOyVOJabkpZoGIZw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    imageAlt: "profile-image",
    name: "Adeeko Emmanuel",
    details: "View full profile",
    statusDetail: "UI/UX Designer",
    time: "8:54PM",
  };

  const ChatIcon = createIcon({
    displayName: "ChatIcon",
    viewBox: "0 0 15 14",
    // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
    path: [
      <path
        fill="white"
        d="M4.99939 5.87802C4.99939 5.71224 5.06525 5.55324 5.18247 5.43601C5.2997 5.31879 5.4587 5.25293 5.62448 5.25293H9.37503C9.54081 5.25293 9.69981 5.31879 9.81703 5.43601C9.93426 5.55324 10.0001 5.71224 10.0001 5.87802C10.0001 6.04381 9.93426 6.2028 9.81703 6.32003C9.69981 6.43725 9.54081 6.50311 9.37503 6.50311H5.62448C5.4587 6.50311 5.2997 6.43725 5.18247 6.32003C5.06525 6.2028 4.99939 6.04381 4.99939 5.87802Z"
      />,
      <path
        fill="white"
        d="M5.62448 7.75391C5.4587 7.75391 5.2997 7.81976 5.18247 7.93699C5.06525 8.05422 4.99939 8.21321 4.99939 8.379C4.99939 8.54478 5.06525 8.70378 5.18247 8.821C5.2997 8.93823 5.4587 9.00409 5.62448 9.00409H8.12484C8.29063 9.00409 8.44962 8.93823 8.56685 8.821C8.68408 8.70378 8.74994 8.54478 8.74994 8.379C8.74994 8.21321 8.68408 8.05422 8.56685 7.93699C8.44962 7.81976 8.29063 7.75391 8.12484 7.75391H5.62448Z"
      />,
      <path
        fill="white"
        d="M0.833697 7.12729C0.83398 5.65956 1.3186 4.23296 2.21238 3.06877C3.10615 1.90458 4.35913 1.06789 5.77693 0.688496C7.19473 0.309099 8.6981 0.408202 10.0538 0.970431C11.4096 1.53266 12.5419 2.52659 13.2751 3.79803C14.0083 5.06947 14.3015 6.54735 14.1091 8.00241C13.9167 9.45747 13.2496 10.8084 12.2111 11.8456C11.1727 12.8828 9.82096 13.5482 8.3657 13.7388C6.91044 13.9294 5.43297 13.6343 4.16249 12.8995L1.56479 13.7662C1.46881 13.7982 1.36591 13.8034 1.26719 13.7813C1.16846 13.7591 1.07767 13.7104 1.00459 13.6404C0.931522 13.5704 0.87895 13.4818 0.852553 13.3842C0.826155 13.2865 0.826935 13.1834 0.854807 13.0862L1.64589 10.3184C1.11148 9.33978 0.83216 8.24232 0.833697 7.12729ZM7.50017 1.57174C6.51929 1.57168 5.55588 1.83133 4.70787 2.3243C3.85986 2.81727 3.15748 3.52599 2.67214 4.3784C2.1868 5.23082 1.9358 6.19655 1.94465 7.17741C1.9535 8.15828 2.22189 9.11932 2.72253 9.96284C2.76105 10.028 2.78585 10.1003 2.7954 10.1754C2.80495 10.2505 2.79906 10.3268 2.77808 10.3995L2.21254 12.3773L4.05471 11.764C4.13295 11.7378 4.21602 11.7295 4.29789 11.7395C4.37976 11.7495 4.45837 11.7776 4.52803 11.8217C5.25609 12.2825 6.08134 12.5676 6.93855 12.6545C7.79576 12.7414 8.66144 12.6277 9.46715 12.3225C10.2729 12.0172 10.9965 11.5287 11.5809 10.8956C12.1654 10.2624 12.5945 9.50205 12.8345 8.67451C13.0744 7.84697 13.1186 6.97496 12.9635 6.1274C12.8085 5.27984 12.4584 4.47997 11.941 3.79101C11.4235 3.10205 10.753 2.54289 9.98225 2.15772C9.21152 1.77255 8.36177 1.57194 7.50017 1.57174Z"
      />,
    ],
  });

  return (
    <Box
      maxW="58rem"
      w='20rem'
      top='5rem'
      pos='absolute'
      left='20rem'
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      m="6"
      p="6" transform='scale(0.8)'
      shadow='md'
    >
      <Box p='10px'>
      <Center>
        <Avatar size="2xl" name={data.name} src={data.imageUrl} />{" "}
      </Center>
      <Center>
        <Box p="6">
          <Text></Text>
          <Heading as="h6" size="sm">
            {data.name}
          </Heading>
          <Center>
            {" "}
            <Text color="#00B87C">{data.details}</Text>
          </Center>
        </Box>
      </Center>
      <Divider />

      <Center>
        <Box>
          <HStack spacing="24px" p="2">
            <IconButton
              bg="#E9E9E9"
              aria-label="message-icon"
              icon={<ChatIcon />}
            />
            <IconButton
              bg="#E9E9E9"
              aria-label="video-icon"
              icon={<FiVideo color="white" />}
            />

            <IconButton
              bg="#00B87C"
              aria-label="file"
              icon={<FiFolder color="white" />}
            />
          </HStack>
        </Box>
      </Center>

      <Box>
        <Box py="3">
          <Text color="#A6A6A6">Status</Text>
          <Text color="#2B2B2B"> {data.statusDetail}</Text>
        </Box>
        <Box>
          <Text color="#A6A6A6">Local time</Text>
          <Text color="#2B2B2B"> {data.time}</Text>
        </Box>
      </Box>
      <Stack direction="row" spacing={4} align="center" mt={6}>
        <Button
          bg="#00B87C"
          color="white"
          variant="solid"
          size="lg"
          width="100%"
          height="56px"
        >
          Message
        </Button>

        <Button
          color="#00B87C"
          variant="outline"
          size="lg"
          width="100%"
          height="56px"
        >
          Call
        </Button>
      </Stack>
      </Box>
    </Box>
  );
};

export default UserProfileOnHover;
