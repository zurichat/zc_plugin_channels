import { Box } from '@chakra-ui/layout';
import {
  IconButton,
  Text,
  Stack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { BiSearch } from 'react-icons/bi';
import { BsPersonPlus } from 'react-icons/bs';
import googleImage from '../channelDetailsAndSetting/images/images.png';
import AddUserModal from './addUserModal';
import { useEffect, useState } from 'react';
import axios from 'axios';
const OrganisationMembersList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userList, setuserList] = useState([]);
  const [fulluserList, setfulluserList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const axios_call =
    'https://api.zuri.chat/organizations/614679ee1a5607b13c00bcb7/members';

  useEffect(() => {
    axios.get(axios_call).then(res => {
      setfulluserList(res.data.data);
      setuserList(
        res.data.data.map(item => {
          // console.log(item);
          return {
            value: item._id,
            label: item.email,
          };
        }),
        setisLoading(false),
      );
      //   setuserList([
      //     ...userList,
      //     ...res.data.data.map(item => {
      //       value: item._id;
      //       label: item.email;
      //     }),
    });
    // .then((res) => {
    //   console.log(userList);
    // });
  }, []);

  const MembersList = [
    {
      FirstName: 'Abibola',
      FullName: 'Ifunanyachi Abibola Oworu-Chima',
      stack: 'Frontend Dev',
      src: './images/images.png',
    },
    {
      FirstName: 'Abibola',
      FullName: 'Ifunanyachi Abibola Oworu-Chima',
      stack: 'Frontend Dev',
      src: './images/images.png',
    },
    {
      FirstName: 'Abibola',
      FullName: 'Ifunanyachi Abibola Oworu-Chima',
      stack: 'Frontend Dev',
      src: './images/images.png',
    },
  ];

  const MembersElementHelper = member => {
    return (
      <Box key={member._id}>
        {/* members list container */}
        <Box display="flex" pos="relative" left="-2.8em">
          {/* members list image avatar */}
          {/* <Image
            src={member.image_url}
            borderRadius="3px"
            h="29px"
            w="36px"
            alignItems="flex-start"
            alt=""
          /> */}
          {/* members list active/non active indicator */}
          <Box
            borderRadius="50%"
            ml="-.5rem"
            mt="1.5rem"
            w=".7em"
            h=".7em"
            borderColor="white"
            borderWidth=".141rem"
            bg="#F2FFFB"
          ></Box>
          {/* display name (first name and full name) */}
          <Text
            display="flex"
            position="relative"
            color="black"
            ml="16px"
            top="-.1rem"
            mt=".5px"
            fontSize="1rem"
            fontWeight="bold"
          >
            {/* {member.name} //TODO REMOVE EMAIL AND SWITCH TO NAME*/}
            {member.email.split('@')[0]}
            <Text color="gray" ml=".3rem" fontWeight="normal" fontSize="1rem">
              {member.email}
            </Text>
          </Text>
        </Box>
        {/* members stack */}
        {/* <Text
          left="-2.9em"
          position="relative"
          color="gray"
          paddingLeft="40px"
          top="-.98rem"
          ml="5.5px"
          mt=".1rem"
          fontWeight="normal"
          fontSize=".8rem"
        >
          {member.stack}
        </Text> */}
      </Box>
    );
  };

  let ActiveMembersElement = MembersList.map(member => {
    return (
      <Box>
        {/* members list container */}
        <Box display="flex" pos="relative" left="-2.8em">
          {/* members list image avatar */}
          <Image
            src={googleImage}
            borderRadius="3px"
            h="29px"
            w="36px"
            alignItems="flex-start"
            alt=""
          />
          {/* members list active/non active indicator */}
          <Box
            borderRadius="50%"
            ml="-.5rem"
            mt="1.5rem"
            w=".7em"
            h=".7em"
            borderColor="white"
            borderWidth=".141rem"
            bg="#00B87C"
          ></Box>
          {/* display name (first name and full name) */}
          <Text
            display="flex"
            position="relative"
            color="black"
            ml="16px"
            top="-.1rem"
            mt=".5px"
            fontSize="1rem"
            fontWeight="bold"
          >
            {member.FirstName}
            <Text color="gray" ml=".3rem" fontWeight="normal" fontSize="1rem">
              {member.FullName}
            </Text>
          </Text>
        </Box>
        {/* members stack */}
        <Text
          left="-2.9em"
          position="relative"
          color="gray"
          paddingLeft="40px"
          top="-.98rem"
          ml="5.5px"
          mt=".1rem"
          fontWeight="normal"
          fontSize=".8rem"
        >
          {member.stack}
        </Text>
      </Box>
    );
  });

  return (
    //  members list container
    <Box
      // transform="scale(0.9)"
      // position="absolute"
      // left="-0.2rem"
      // top="11rem"
      w="100%"
      h="520px"
      alignContent="center"
      backgroundColor="white"
      color="black"
    >
      {/* input feild */}
      <InputGroup size="md" w="92%" ml="27px" mt="14px">
        <Input
          _focus="none"
          _hover="none"
          borderColor="#000000"
          pr="4.5rem"
          _placeholder={{ color: '#333333' }}
          placeholder="Find Members"
        />
        <InputLeftElement width="4.5rem" bgColor="none">
          <IconButton
            ml="-2rem"
            background="none"
            _hover="none"
            icon={<BiSearch color="#333333" />}
          />
        </InputLeftElement>
      </InputGroup>

      {/* add member icon and text */}
      <Stack
        mt="1.5rem"
        ml="1.8rem"
        mb="1.8rem"
        //   pos="relative"
        direction={'row'}
        spacing="18px"
        onClick={onOpen}
      >
        <IconButton
          bgColor="#E1FDF4"
          transform="scale(1)"
          borderRadius="4px"
          _hover="none"
          icon={<BsPersonPlus color="#00B87C" />}
        />
        <Text
          color="black"
          fontSize="1.2rem"
          pos="relative"
          left="-.6rem"
          cursor="pointer"
          top=".32rem"
          ml="1px"
          mt="2rem"
          mb="0px"
          fontWeight="bold"
        >
          Add People
        </Text>
      </Stack>
      <AddUserModal
        isOpen={isOpen}
        onClose={onClose}
        userList={userList}
        isLoading={isLoading}
      />

      {/* stack of members list  */}
      <Stack
        mt="1.5rem"
        w="100%"
        ml="4.5rem"
        //   pos="relative"
        direction={'column'}
        spacing="18px"
      >
        <Stack direction={'column'} spacing="0">
          {isLoading ? (
            <Text>I AM LOADING</Text>
          ) : (
            fulluserList.map(MembersElementHelper)
          )}
          {/* no keys + the react in the root config was a prod build */}
          {/* {ActiveMembersElement} */}
          {/* {MembersElement} */}
          {/* {ActiveMembersElement} */}
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrganisationMembersList;
