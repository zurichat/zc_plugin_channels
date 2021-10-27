import React from "react"
import { Box, Text } from "@chakra-ui/layout"

const profileHeader = () => (
  <Box
    bg="white"
    w="352px"
    h="56px"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="flex-end"
    p="10"
  >
    <Text
      color="black"
      alignItems="center"
      fontFamily="Lato"
      fontWeight="bold"
      fontSize="18"
    >
      Profile
    </Text>
    <Text color="black">x</Text>
  </Box>
)

export default profileHeader
