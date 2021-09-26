import {
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Switch,
} from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { HStack, Text } from "@chakra-ui/layout";
import React, { useRef } from "react";
import { FormHelperText } from "@chakra-ui/form-control";
import { useState } from "react";
import { useDispatch } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";

const CreateChannelModal = ({ onClose, isOpen }) => {
  const initialRef = useRef();
  const history = useHistory();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priva, setPriva] = useState(true);
  const [owner, setOwner] = useState("61468abd1a5607b13c00bd4f");
  const data = {
    name: name,
    owner: owner,
    description: description,
    private: priva
  }
  const { _createChannel } = bindActionCreators(appActions, dispatch);
  const newChannel = async () => {
    await _createChannel("614679ee1a5607b13c00bcb7", data);
  };
  
   const handleSubmit = () => {
    console.log(data);
    newChannel().then(() => {
      window.location.reload();
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent px="0.5rem" borderRadius="2px">
        <ModalHeader fontSize="20px">Create a Channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="#8B8B8B" mb="1rem">
            Channels are where your team communicates. They’re best when
            organized around a topic — #marketing, for example.
          </Text>
        
          <FormControl mb="1rem">
            <FormLabel fontWeight="bold">Name</FormLabel>
            <Input
              ref={initialRef}
              onChange={(e) => setName(e.target.value)}
              borderRadius="2px"
              focusBorderColor="green.200"
            />
          </FormControl>

          <FormControl mb="1.5rem">
            <FormLabel fontWeight="bold">
              <HStack>
                <Text>Description</Text>
                <FormHelperText>(optional)</FormHelperText>
              </HStack>
            </FormLabel>
            <Input borderRadius="2px" focusBorderColor="green.200" onChange={(e) => setDescription(e.target.value)} />
            <FormHelperText> What is this channel about?</FormHelperText>
          </FormControl>

          <Text as="h5" size="sm" fontSize="16px" fontWeight="bold" mb="0.5rem">
            Make this Channel Private
          </Text>
          <HStack justifyContent="space-between">
            <Text color="#8b8b8b" fontSize="0.9rem">
              When a channel is set to private, <br />
              it can only be viewed or joined by invitation.
            </Text>
            <Switch colorScheme="whatsapp" focusBorderColor="green.400" checked="false" onChange={(e) => setPriva(e.target.checked)}/>
          </HStack>
        </ModalBody>

        <ModalFooter>
          {/* <Link to="/create-channel"> */}
            <Button
              px="2rem"
              py="1.2rem"
              colorScheme="whatsapp"
              borderRadius="md"
              onClick={handleSubmit}
            >
              Create
            </Button>
          {/* </Link> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateChannelModal;
