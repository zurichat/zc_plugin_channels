import React, { useEffect } from "react";
import { Box, HStack } from "@chakra-ui/layout";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { Spacer, Button } from "@chakra-ui/react";
import CreateChannelModal from "../createChannel/createChannelModal";
import TopSearch from "../createChannel/TopSearch";
import { useDisclosure } from "@chakra-ui/hooks";
import { Icon } from "@chakra-ui/icon";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // STEP FIVE (Extract redux function)
  const dispatch = useDispatch();
  const { _getUsers } = bindActionCreators(appActions, dispatch);

  // STEP EIGHT (Extract redux state)
  const { users } = useSelector((state) => state.appReducer);
  console.log(users);

  // STEP SIX
  const loadData = async () => {
    await _getUsers();
  };

  // STEP SEVEN
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box width="100%" height="100vh" bg="#E5E5E5" pt={4}>
      <Box w="95%" mx="auto">
        <TopSearch />
      </Box>
      <Box bg="white" w="95%" p={4} mx="auto" borderRadius="2px">
        <HStack>
          <Heading size="sm"># New Channel</Heading>
          <Icon as={BiChevronDown} boxSize="20px" color="gray.500" />
          <Spacer />
          <Button
            onClick={onOpen}
            size="md"
            colorScheme="green"
            fontSize="14px"
          >
            Create New channel
          </Button>
          <CreateChannelModal isOpen={isOpen} onClose={onClose} />
        </HStack>
      </Box>
      <Box
        bg="white"
        mt="20px"
        w="95%"
        p={4}
        color="black"
        ml="8"
        borderRadius="2px"
      >
        {/* Mount your component here and unmount when done */}
      </Box>
    </Box>
  );
};

export default Home;
