import React from 'react'
import ThreadHeader from "./subs/ThreadHeader"
import MessageForm from "./subs/MessageForm"
import MainMessage from "./subs/MainMessage"
import ThreadReplies from "./subs/ThreadReplies"
import { Container } from "@chakra-ui/react"

function Thread() {
    return(
      <Container maxW="370px"> 
        <ThreadHeader />
<MainMessage />
        <ThreadReplies />
        <MessageForm />
      </Container>
    )
}
export default Thread
