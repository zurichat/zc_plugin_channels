import React from 'react'
import { Box, Center, Text } from '@chakra-ui/layout'

const Home = () => {
  return (
    <Box width='100%' height='100vh' bg='gray.900'>
      <Box
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        textAlign='center'
      >
        <Text fontSize='4xl' color='white'>
          Team Coelho
        </Text>

        <Text color='white'>Zuri Plugin Channels</Text>
      </Box>
    </Box>
  )
}

export default Home
