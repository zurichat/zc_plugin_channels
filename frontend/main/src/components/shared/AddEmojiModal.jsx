import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button, Box, Text, IconButton, Input } from "@chakra-ui/react";
import { Divider, Stack, HStack, Center } from "@chakra-ui/layout";

const AddEmojiModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="2px" borderBottomColor="gray.100">
            Add Emoji
          </ModalHeader>
          <Box></Box>
          <ModalCloseButton _focus={{ outline: "none" }} />
          <ModalBody>
            <Box>
              <Text fontSize="15px" color="#3A3A3A">
                Your custom emoji will be available to everyone in your
                workspace. You’ll find it in the custom tab of the emoji picker.
                (Hint: it’s the one with the Zuri icon!)
              </Text>
              <Stack spacing={0}>
                <Box as="span" fontWeight="900" fontSize="15px" pt="15px">
                  1. Upload an image
                </Box>
                <Text fontSize="15px" color="#8B8B8B" ps="20px">
                  Square images under 128 KB and with transparent backgrounds
                  work best. If your image is too large, we’ll try and resize it
                  for you.
                </Text>
              </Stack>
              <HStack pt="18px">
                <Box
                  border="1px"
                  bg="#F8F8F8"
                  p="15px"
                  borderRadius="3px"
                  borderColor="#A1A1A1"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V22C0 22.5304 0.210714 23.0391 0.585786 23.4142C0.960859 23.7893 1.46957 24 2 24H22C22.5304 24 23.0391 23.7893 23.4142 23.4142C23.7893 23.0391 24 22.5304 24 22V2C24 1.46957 23.7893 0.960859 23.4142 0.585786C23.0391 0.210714 22.5304 0 22 0ZM22 22H2V16L7 11L12.59 16.59C12.9647 16.9625 13.4716 17.1716 14 17.1716C14.5284 17.1716 15.0353 16.9625 15.41 16.59L17 15L22 20V22ZM22 17.17L18.41 13.58C18.0353 13.2075 17.5284 12.9984 17 12.9984C16.4716 12.9984 15.9647 13.2075 15.59 13.58L14 15.17L8.41 9.58C8.03527 9.2075 7.52837 8.99841 7 8.99841C6.47163 8.99841 5.96473 9.2075 5.59 9.58L2 13.17V2H22V17.17Z"
                      fill="black"
                    />
                  </svg>
                </Box>
                <Box border="1px" bg="#000000" p="15px" borderRadius="3px">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V22C0 22.5304 0.210714 23.0391 0.585786 23.4142C0.960859 23.7893 1.46957 24 2 24H22C22.5304 24 23.0391 23.7893 23.4142 23.4142C23.7893 23.0391 24 22.5304 24 22V2C24 1.46957 23.7893 0.960859 23.4142 0.585786C23.0391 0.210714 22.5304 0 22 0ZM22 22H2V16L7 11L12.59 16.59C12.9647 16.9625 13.4716 17.1716 14 17.1716C14.5284 17.1716 15.0353 16.9625 15.41 16.59L17 15L22 20V22ZM22 17.17L18.41 13.58C18.0353 13.2075 17.5284 12.9984 17 12.9984C16.4716 12.9984 15.9647 13.2075 15.59 13.58L14 15.17L8.41 9.58C8.03527 9.2075 7.52837 8.99841 7 8.99841C6.47163 8.99841 5.96473 9.2075 5.59 9.58L2 13.17V2H22V17.17Z"
                      fill="white"
                    />
                  </svg>
                </Box>

                <Stack>
                  <Text>Select an image</Text>
                  <Center
                    color="#3A3A3A"
                    border="1px"
                    fontWeight="bold"
                    fontSize="15px"
                  >
                    Upload image
                  </Center>
                </Stack>
              </HStack>
              <Stack spacing={0}>
                <Box as="span" fontWeight="900" fontSize="15px" pt="15px">
                  2. Give it a name{" "}
                </Box>
                <Text fontSize="15px" color="#8B8B8B" ps="20px">
                  This is also what you’ll type to add this emoji to your
                  messages.
                </Text>
              </Stack>
              <Input placeholder=":Zuri_Logo:" size="md" my={5} />
            </Box>
          </ModalBody>

          <ModalFooter borderTop="2px" borderTopColor="gray.100">
            <Button
              variant="outline"
              colorScheme="green"
              mr={3}
              onClick={onClose}
              w="132px"
            >
              Cancel
            </Button>
            <Button bg="#00B87C" w="132px" color="white">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEmojiModal;
