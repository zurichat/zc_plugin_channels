import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  // Flex,
  Box,
  Text,
  UnorderedList,
  ListItem,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import appActions from "../../redux/actions/app";
import { useSelector } from "react-redux";


function DeleteChannel() {
  // STEP FIVE (Extract redux function)
  const dispatch = useDispatch();
  const { _deleteChannel } = bindActionCreators(appActions, dispatch);

  // STEP EIGHT (Extract redux state)
  const { deleteChannel } = useSelector((state) => state.channelsReducer);
  console.log(deleteChannel);

  const org_id = "614679ee1a5607b13c00bcb7"; //Test value for org id
  const channel_id = "613f70bd6173056af01b4aba"; // Test  value to for channel_id

  // STEP SIX
  const loadData = async () => {
    await _deleteChannel(org_id, channel_id);
  };

  // STEP SEVEN
  useEffect(() => {
    loadData();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [checked, setChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

   const canDelete = () => {
     if (checked) {
       setIsDisabled(true);
     } else {
       setIsDisabled(false);
     }
   };

   const handleCheckBox = () => {
     setChecked(!checked);

     return canDelete();
   };


  return (
    <>
      <Button onClick={onOpen}> Delete channel</Button>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="#000000" fontStyle="bold" fontSize="31px" p={5}>
              Delete channel
            </ModalHeader>
            <Text color="#3A3A3A" m={5} p={5}>
              Are you sure you want to delete this channel?This cannot be undone
            </Text>
            <ModalCloseButton />

            <ModalBody>
              <Box
                p={3}
                borderRadius="10px"
                border="1px"
                borderColor="blue.200"
              >
                <Box>
                  <Text>Keep in mind that:</Text>
                </Box>
                <UnorderedList mb={5}>
                  <ListItem>
                    Any files uploaded to this channel won’t be removed
                  </ListItem>
                  <ListItem>
                    You can archive a channel instead without removing its
                    messages
                  </ListItem>
                </UnorderedList>
                <Stack spacing={10} direction="row">
                  <Checkbox
                    onChange={handleCheckBox}
                    colorScheme="green"
                  ></Checkbox>
                  <Text>Yes, permanently delete the channel</Text>
                </Stack>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                border="1px"
                borderColor="FF0000"
                bg="white"
                color="#FF0000"
                mr={3}
                p={3}
                onClick={onClose}
                borderRadius="10px"
                width="151px"
                height="56px"
                _hover={{ bg: "#fff" }}
              >
                Cancel
              </Button>
              <Button
                variant="ghost"
                border="1px"
                borderColor="gray.200"
                color="white"
                bg="#00B87C"
                borderRadius="5px"
                width="151px"
                height="56px"
                _hover={{ bg: "#00B87C" }}
                onClick={loadData}
                disabled={isDisabled}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default DeleteChannel
