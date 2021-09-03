import { Box, Link, Text } from '@chakra-ui/react'
import React from 'react'

const ChannelBody = () => {
    return (
        <Box width="60%" m="auto" pt="2rem" fontSize="15px">
            <Text color="black">This is the very beginning of the <Link color="#0562ed" fontWeight="bold"> #Announcement</Link> channel</Text>
            <Text color="grey"><Link color="#0562ed" fontWeight="bold">@Abibola</Link> created this channel on Aug 30th.</Text>
        </Box>
    )
}

export default ChannelBody
