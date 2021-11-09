import { StackDivider, VStack } from "@chakra-ui/layout";
import React from "react";

import { useSelector } from "react-redux";
import ChannelContainer from "./ChannelContainer";

const ChannelList = ({orgId, channels}) => {
  
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={0}
      align="stretch"
    >
      {/* Channels List Element */}
      {channels &&
        channels.map((chan) => (
          <ChannelContainer key={chan._id} chan={chan} orgId={orgId} />
        ))}
    </VStack>
  );
};

export default ChannelList;
