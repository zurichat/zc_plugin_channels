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
import CreateChannel from "../createChannel";

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
    <CreateChannel />
  );
};

export default Home;
