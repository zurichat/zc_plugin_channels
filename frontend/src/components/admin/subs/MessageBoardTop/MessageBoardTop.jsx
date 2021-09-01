import React from "react";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import EachMessage from "./EachMessage";


//DEMO MESSAGES THIS WOULD BE FETCHED LATER FROM THE BACK END TEAM
const messages = [
  {
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    userName: "nwanoch",
    time: "10:30 am",
    message:
      "I need not explain how abibola is a boss lady, while Teoun is naza pro max, charles is prof. charles xavier sorry i meant charles kendrick",
  },
  {
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    userName: "nwanoch",
    time: "10:30 am",
    message:
      "I need not explain how abibola is a boss lady, while Teoun is naza pro max, charles is prof. charles xavier sorry i meant charles kendrick",
  },
  {
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    userName: "nwanoch",
    time: "10:30 am",
    message:
      "I need not explain how abibola is a boss lady, while Teoun is naza pro max, charles is prof. charles xavier sorry i meant charles kendrick",
  },
];

function MessageBoardTop() {
  return (
    <Box pl="20px" pr="20px" textAlign="center" width="658px">
      <Button
        background="#FFFFFF"
        border="1px solid rgba(87, 87, 87, 0.3)"
        box-sizing="border-box"
        borderRadius="15px"
        size="xs"
      >
        Yesterday
      </Button>
      <Box textAlign="left">
        {messages.map((eachMessage) => {
          return (
            <EachMessage
              key={eachMessage.id}
              src={eachMessage.avatar}
              userName={eachMessage.userName}
              messageTime={eachMessage.time}
              messageContent={eachMessage.message}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default MessageBoardTop;
