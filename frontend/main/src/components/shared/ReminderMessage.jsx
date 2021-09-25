import React, { useState } from "react";
import {
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Textarea,
  Text,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { ExternalLinkIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function ReminderMessage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  var x = 60; //minutes interval
  var hours = []; // time array
  var tt = 0; // start time
  var ap = ["AM", "PM"]; // AM-PM
  for (var i = 0; tt < 24 * 60; i++) {
    var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    var mm = tt % 60; // getting minutes of the hour in 0-55 format
    hours[i] =
      ("0" + (hh % 12)).slice(-2) +
      ":" +
      ("0" + mm).slice(-2) +
      " " +
      ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
    tt = tt + x;
  }

  return (
    <ChakraProvider>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="408px" maxW="565px" padding="0 30px">
          <ModalHeader
            padding="0px"
            mt="10px"
            mb="0px"
            fontFamily="Lato"
            color="#000000"
            fontWeight="900"
            p="0"
            fontSize="24px"
          >
            Create a reminder
          </ModalHeader>
          <ExternalLinkIcon
            width="18px"
            height="18px"
            position="absolute"
            right="60px"
            top="20px"
            color="#333333"
          />
          <ModalCloseButton
            border="none"
            bg="none"
            _focus={{ outline: "none" }}
            width="12px"
            height="12px"
            position="absolute"
            right="30px"
            top="25px"
            color="#333333"
            onClick={onClose}
          />
          <ModalBody p="0" mt="1rem">
            <FormControl>
              <FormLabel color="#333333">When</FormLabel>
              <InputGroup>
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  height="40px"
                  width="100%"
                  borderRadius="8px"
                  resize="none"
                  focusBorderColor="green.500"
                  border="1px solid #8C8C8C"
                  type="date"
                />
                <InputRightElement children={<ChevronDownIcon />} />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel mt="0.5rem">Time</FormLabel>
              <InputGroup>
                <Select
                  height="40px"
                  minWidth="100%"
                  borderRadius="8px"
                  border="1px solid #8C8C8C"
                  resize="none"
                  focusBorderColor="green.500"
                >
                  {hours.map((hour) => (
                    <option
                      onChange={(e) => setTime(e.target.value)}
                      value={time}
                      height="40px"
                      width="100%"
                    >
                      {hour}
                    </option>
                  ))}
                </Select>
                <InputRightElement
                  marginRight="30px"
                  children={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                        stroke="#333333"
                        stroke-width="1.22693"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 4.5V9L11.25 11.25"
                        stroke="#333333"
                        stroke-width="1.22693"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel color="#333333" mt="0.5rem">
                Add a note{" "}
                <Text display="inline-block" color="#A9A9A9">
                  (optional)
                </Text>
              </FormLabel>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                height="60px"
                width="100%"
                borderRadius="8px"
                resize="none"
                focusBorderColor="green.500"
                border="1px solid #8C8C8C"
                placeholder="Remind me to..."
              />
            </FormControl>
          </ModalBody>

          <ModalFooter
            mt="0.5rem"
            mb="1rem"
            p="0"
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              onClick={onClose}
              borderRadius="5px"
              color="#000000"
              border=" 1px solid #000000"
              bg="transparent"
              px="2rem"
              py="12px"
              marginRight="16px"
            >
              Cancel
            </Button>
            <Button
              borderRadius="5px"
              bg="#00B87C"
              border="1px #00B87C solid"
              color="#FFFFFF"
              px="2rem"
              py="12px"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
