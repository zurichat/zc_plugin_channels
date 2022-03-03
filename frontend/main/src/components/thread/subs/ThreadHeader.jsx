import React from "react"
import { Box, Container, CloseButton } from "@chakra-ui/react"

function ThreadHeader() {
  return (
    <Container
      alignItems="center"
      h="50px"
      display="flex"
      justifyContent="space-between"
      color="#fff"
      bgColor="
        #00B87C"
      w="100%"
    >
      <Box fontSize="18px" margin="13px" fontWeight="bold">
        Thread
        {/* <Text fontSize="13px">#Announcement</Text> */}
      </Box>
      <CloseButton borderWidth="0" bg="none" margin="12px" />
    </Container>
  )
}

export default ThreadHeader
