import React from "react";
import ThreadHeader from "./subs/ThreadHeader";
import MainMessage from "./subs/MainMessage";
import ThreadReplies from "./subs/ThreadReplies";
import MessageInput from "../shared/MessageInput";
import { Container, Box } from "@chakra-ui/react";

function Thread() {
  return (
    <Container maxW={["100vw","38vw"]} bg="white" m="5px" p="0px">
      <ThreadHeader />
      <MainMessage />
        <Box width="100%" overflowY="scroll" 
        css={{
        "&::-webkit-scrollbar": {
          width: "0",
        },
        "&::-webkit-scrollbar-track": {
          width: "0",
        }}
      }
        height={["45vh"]}>
          <ThreadReplies />
        </Box>
      <MessageInput />
    </Container>
  );
}
export default Thread;
