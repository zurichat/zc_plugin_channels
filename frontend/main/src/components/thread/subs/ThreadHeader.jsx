import React, { useEffect } from "react";
import { Box, Container, CloseButton } from "@chakra-ui/react";
import appActions from "../../../redux/actions/app";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";


function ThreadHeader({channelId, onClose}) {
  // const org_id = '614679ee1a5607b13c00bcb7';//Test value for org id

  const { users } = useSelector((state) => state.appReducer);
  console.log(users);

  const org_id = users.org_id;
  const channel_id = channelId; //assigning dynamic channel id to channel_id

  const dispatch = useDispatch();
  const { _getChannelDetails } = bindActionCreators(appActions, dispatch);//extract redux function

  const loadChannelDetails = async () => {

    await _getChannelDetails(org_id, channel_id);

  };

  useEffect(() => {

    loadChannelDetails();

  }, [channelId]);

  const { channelDetails } = useSelector((state) => state.channelsReducer);//extract redux state
  console.log(channelDetails); // to extract name

  return (
    <Container
      alignItems="center"
      h="44px"
      display="flex"
      justifyContent="space-between"
      color="#fff"
      bgColor="
        #00B87C"
      w="100%"
    >
      <Box fontSize="18px" margin="13px" fontWeight="bold">
        Thread
        <Text fontSize="sm">#{channelDetails.name}</Text>
      </Box>
      <CloseButton borderWidth="0" bg="none" margin="12px" onClick={onClose} />
    </Container>
  );
}

export default ThreadHeader;
