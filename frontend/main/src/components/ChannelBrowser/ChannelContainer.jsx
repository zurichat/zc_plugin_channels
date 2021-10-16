import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { FiHash } from "react-icons/fi";
import { GiPlainCircle } from "react-icons/gi";
import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { __ } from "lodash";
import { CheckIcon } from "@chakra-ui/icons";

const ChannelContainer = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const userData = {
    _id: props.orgId._id,
  };
  const [users, setUsers] = useState(props.chan.users);
  const { _getChannelDetails } = bindActionCreators(appActions, dispatch);

  const history = useHistory();

  const loadChannelDetails = async () => { 
    await _getChannelDetails(props.orgId.org_id, props.chan._id)
  };

  useEffect(() => { 
    loadChannelDetails();
  }, []);

  const { channelMember} = useSelector((state) => state.channelsReducer);
  
  useEffect(() => {
    if (channelMember._id) {
      history.push("/message-board/" + props.chan._id);
    }
  }, [channelMember]);

  const joinChannel = () => {
    // add member to channel after clickig on join
    dispatch(
      appActions._addChannelMember(props.orgId.org_id, props.chan._id, userData)
    );
  };

  return (
    <Box
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      p={4}
      textAlign="left"
      _hover={{ background: "#F9F9F9" }}
    >
      <HStack spacing="auto">
        <Box className="MenuOpt">
          <Heading
            size="md"
            fontSize="18px"
            fontWeight={600}
            textTransform="capitalize"
          >
            <Icon as={FiHash} h={4} w={4} />
            {props.chan.name}
          </Heading>
          <Flex justifyContent="flex-start" alignItems="center" mt={2}>
            {users.hasOwnProperty(props.orgId._id) && (
              <>
                <Text color="#00B87C" fontSize="12px" mr={4}>
                  <CheckIcon />
                  Joined
                </Text>
                <GiPlainCircle style={{ marginRight: "10px" }} fontSize="2px" />
              </>
            )}
            <Text color="#A1A1A1" fontSize="12px" mr={4}>
              {props.chan.members} Members
            </Text>
            <GiPlainCircle fontSize="2px" />

            <Text color="#A1A1A1" fontSize="12px" ml={4}>
              {props.chan.description}
            </Text>
          </Flex>
        </Box>
        {open && (
          <Box
            bgColor="unset"
            border="0"
            boxShadow="none"
            sx={{ position: "relative", top: 0 }}
          >
            <HStack p={2}>
              {users.hasOwnProperty(props.orgId._id) ? (
                <>
                  <Link to={"/message-board/" + props.chan._id}>
                    <Button
                      width="147px"
                      bgColor="unset"
                      border="1px solid #00B87C"
                      color="#00B87C"
                      borderRadius="0"
                      _hover={{ bg: "#ebedf0" }}
                    >
                      Open
                    </Button>
                  </Link>

                  <Button
                    width="147px"
                    bgColor="#00B87C"
                    color="white"
                    borderRadius="0"
                    _hover={{ bg: "#007A5A" }}
                  >
                    Leave
                  </Button>
                </>
              ) : (
                <>
                  <Link to={"/message-board/" + props.chan._id}>
                    <Button
                      width="147px"
                      bgColor="unset"
                      border="1px solid #00B87C"
                      color="#00B87C"
                      borderRadius="0"
                      _hover={{ bg: "#ebedf0" }}
                    >
                      View
                    </Button>
                  </Link>

                  <Button
                    width="147px"
                    bgColor="#00B87C"
                    color="white"
                    borderRadius="0"
                    _hover={{ bg: "#007A5A" }}
                    onClick={joinChannel}
                  >
                    Join
                  </Button>
                </>
              )}
            </HStack>
          </Box>
        )}
      </HStack>
    </Box>
  );
};

export default ChannelContainer;
