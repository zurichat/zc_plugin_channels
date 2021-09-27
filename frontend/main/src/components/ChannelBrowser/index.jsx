import { AddIcon } from "@chakra-ui/icons";
import {
  Box
} from "@chakra-ui/layout";
import React, { useEffect } from "react";
import ChannelBrowserHeader from "./ChannelBrowserHeader";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import SearchMenu from "./SearchMenu";
import ChannelList from "./ChannelList";

import { useSelector } from "react-redux";


const ChannelBrowser = () => {

  const dispatch = useDispatch();
  const { _getChannels } = bindActionCreators(appActions, dispatch);

  const loadChannels = async () => {
    await _getChannels("614679ee1a5607b13c00bcb7");
  };

  useEffect(() => {
    loadChannels();
  }, []);

  return (
    <Box mt="0" bgColor="#E5E5E5" height="100vh">
      <ChannelBrowserHeader />
      <Box
        bgColor="white"
        h="full"
        mr={2}
        p={4}
        pt="16px"
        sx={{ "@media screen and (max-width: 768.5px)": { marginRight: "0" } }}
      >
        <SearchMenu/>
        <ChannelList/>
      </Box>

      {/* Mobile View to Add Channel */}
      <AddIcon
        bgColor="#00B87C"
        color="white"
        w="50px"
        h="50px"
        p="3"
        borderRadius="50%"
        display="none"
        sx={{ "@media screen and (max-width: 768.5px)": { display: "block" } }}
      />
     
    </Box>
  );
};

export default ChannelBrowser;
