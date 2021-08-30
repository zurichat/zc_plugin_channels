import React from 'react'
import { Box, Center, Text } from '@chakra-ui/layout'

const Home = () => {
  return (
    <Box width='100%' height='100vh' bg='gray.500'>
      <Box
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        textAlign='center'
      >
        <Text fontSize='6xl' color='white'>
          Update on Team Coelho
        </Text>

        <Text color='white' fontSize='2xl'>Zuri Chat Channels Plugin update</Text>
      </Box>
    </Box>
  )
}

export default Home
