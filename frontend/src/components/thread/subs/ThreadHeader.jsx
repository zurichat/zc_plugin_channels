import React from 'react'
import { Box, Container, CloseButton } from "@chakra-ui/react"


function ThreadHeader() {
    return (
        <Container margin="5px" alignItems="center" h="50px" display="flex" justifyContent="space-between" bg="white" maxW="352px">
            <Box fontSize="18px" p={4} color="#2B2B2B" margin="13px" fontWeight='bold'>
                Thread
            </Box>
            <CloseButton borderWidth="0" bg="none" margin="12px" />
        </Container>
    )
}

export default ThreadHeader
