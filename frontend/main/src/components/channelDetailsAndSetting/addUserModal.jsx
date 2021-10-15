import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  useDisclosure,
  Text,
  Flex,
  Center,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';

const AddUserModal = props => {
  //picking up the prop
  //   const { saveDescription } = props;

  //Chakra specific hook for handling modal opening and closing
  const { isOpen, onClose, userList, isLoading, addMemberHandler } = props;
  const initialRef = React.useRef();
  const [selectedMembers, setselectedMembers] = useState([]);
  const animatedComponents = makeAnimated();

  return (
    <>
      {/* The button is what get's rendered when this component is mounted */}
      {/* <Button onClick={onOpen}>Edit Description</Button> */}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          //   h="442px"
          maxW="464px"
          padding="0px"
          margin="0px"
          borderRadius="4px"
        >
          <ModalHeader padding="0px" fontSize="18px">
            <Flex borderBottom="1px solid #F6F6F6" margin="0" padding="20px">
              <Center justifyContent="space-between" width="100%">
                <Text>Add People</Text>
                <Flex>
                  <Center
                    // width="40px"
                    // height="40px"
                    borderRadius="3px"
                    _hover={{ backgroundColor: '#F6F6F6' }}
                    onClick={onclose}
                  >
                    {/* <img src={cancelIcon} alt="cancel_icon" /> */}X
                  </Center>
                </Flex>
              </Center>
            </Flex>
          </ModalHeader>

          <ModalBody padding="0px 29px 0px 23px" mt="24px" mb="24px">
            <Select
              className="m-1"
              isLoading={isLoading}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={userList}
              placeholder="Enter a name or email"
              value={selectedMembers}
              onChange={e => {
                setselectedMembers(e);
              }}
            />
          </ModalBody>

          <ModalFooter padding="0px 23px 24px">
            <Button
              colorScheme="green"
              color="white"
              backgroundColor="#00B87C"
              fontSize="15px"
              fontWeight="400"
              padding="12px 18px"
              borderRadius="3px"
              onClick={addMemberHandler}
              disabled={selectedMembers.length < 1}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddUserModal;
