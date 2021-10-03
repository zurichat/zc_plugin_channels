import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ChannelBrowserHeader from "./ChannelBrowserHeader";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import ChannelList from "./ChannelList";
import PluginHeaderC from "../createChannel/homeHeader";
import FloatingButton from "./FloatingButton";

const ChannelBrowser = () => {
  const { users } = useSelector((state) => state.appReducer);

  const dispatch = useDispatch();
  const [orgId, setOrgId] = useState("");
  const { _getChannels } = bindActionCreators(appActions, dispatch);
 

  const loadChannels = async () => {
    await _getChannels(orgId.org_id);
  };

  useEffect(() => {
    if (users) {
      setOrgId(users[0]);
    }
  }, [users]);

  useEffect(() => {
    if (orgId) {
      loadChannels();
    }
  }, [orgId]);

  return (
    <Box mt="0" bgColor="#E5E5E5" height="100vh">
      {/* <ChannelBrowserHeader /> */}
      <PluginHeaderC />
      <FloatingButton />
      
      <Box
        bgColor="white"
        h="full"
        mr={2}
        p={4}
        pt="16px"
        sx={{ "@media screen and (max-width: 768.5px)": { marginRight: "0" } }}
      >
        <SearchMenu />
        <ChannelList orgId={orgId} />
      </Box>

      {/* Mobile View to Add Channel */}
      
      
    </Box>
  );
};

export default ChannelBrowser;
