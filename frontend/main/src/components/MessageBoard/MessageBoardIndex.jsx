import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import APIservice from "../../utils/api";
import { USER_CAN_INPUT } from "../../redux/actions/types";

import ChannelHeader from "../shared/ChannelHeader";
// import ChannelNameBanner from "../admin/subs/ChannelNameBanner/ChannelNameBanner";
import MessageCardContainer from "./subs/MessageCardContainer/MessageCardContainer";
// import InputFieldComponent from "./subs/InputFieldComponent/InputFieldComponent";
import MessageInput from "../shared/MessageInput";
// import Thread from "../thread/Thread";
//import MessageOptionsPopUpMenu from "./subs/MessageOptionsPopUpMenu/MessageOptionsPopUpMenu";

import { useParams } from "react-router";
import DisabledInput from "../shared/DiasbledInput";
import CentrifugoComponent from "./subs/Centrifugo/CentrifugoComponent";

const MessageBoardIndex = () => {
  const dispatch = useDispatch();

  const [canInput, setCanInput] = useState(true);

  const { _userCanInput } = bindActionCreators(appActions, dispatch);

  useEffect(() => {
    const fetchData = async () => {
      const data = `{
        "_id": "123",
        "role_id": "1",
        "is_admin": false,
      }`;
      const res = await APIService.userCanInput(
        "614679ee1a5607b13c00bcb7",
        "614fd412cf2c0f1ad7585394",
        data
      );
      console.log(data, res);
    };

    fetchData();
    // setCanInput(res)
  }, []);

  return (
    <Box bg="#F9F9F9" m="5px" width="99%">
      <CentrifugoComponent />
      <Flex>
        <Box width="100%">
          <ChannelHeader />
          <Box
            m="5px"
            bg="white"
            overflowY="scroll"
            height={["73vh", "75vh", "60vh", "58vh"]}
            css={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
              "&::-webkit-scrollbar-track": {
                width: "0",
              },
            }}
          >
            <MessageCardContainer />
          </Box>
          {canInput ? <MessageInput /> : <DisabledInput />}
        </Box>
        {/* <Box>
          <Thread/>
        </Box> */}
      </Flex>
    </Box>
  );
};

export default MessageBoardIndex;
