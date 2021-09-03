import React from 'react'
import ThreadHeader from "./subs/ThreadHeader"
import MessageForm from "./subs/MessageForm"
import { Container } from "@chakra-ui/react"

function Index() {
    return(
      <Container maxW="350px"> 
        <ThreadHeader />
        <MessageForm />
      </Container>
    )
}
export default Index
