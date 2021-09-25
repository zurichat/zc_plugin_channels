import React from 'react'
import { Container, Box, Text } from "@chakra-ui/react"



function Display({ emojis, handleIncrement }) {
    return (
        <div>
            <Box p="15px" cursor="pointer" alignItems="center" display="flex" flexWrap="wrap"> 
                {emojis && emojis.length > 0 && emojis.map((item, index) => (
                    <Container  
                    display="flex"
                    bg="#EFEFEF" p="3px 6px"
                    border='1px solid #1D1C1D06                    ' 
                    borderRadius='25px' mr="4px" key={index} >
                        <Container 
                            onClick={() => handleIncrement(item.emoji)}

                        >
                            {item.emoji}
                        </Container>
                        {item.count > 0 && (
                            <Text fontWeight="600" fontSize='16px' ml="3px" p='0' m='0'>{item.count}</Text>
                        )}
                    </Container>
                ))}
            </Box>
        </div>
    )
}

export default Display
