import React from "react"
import { Container, Box } from "@chakra-ui/react"
import ThreadHeader from "./subs/ThreadHeader"
import MainMessage from "./subs/MainMessage"
import ThreadReplies from "./subs/ThreadReplies"
import MessageInput from "../shared/MessageInput"

function Thread() {
  return (
    <Container maxW="40vw" minW="20vw" bg="#f9f9f9" m="5px" p="0px">
      <Box width="100%">
        <ThreadHeader />
      </Box>
      <MainMessage />
      <Box
        width="95%"
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "8px"
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#00B87C"
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#60a37a"
          }
        }}
        height={["45vh"]}
      >
        <ThreadReplies />
      </Box>
      <Box width="95%" backgroundColor="white" marginTop="0.5rem">
        <MessageInput />
      </Box>
    </Container>
  )
}
export default Thread
