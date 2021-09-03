import React from 'react'
import { Box, Text, Flex, Divider } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'



const FileList = () => {

    const files = [
        { filename: "Image.png", time: "Aug 25th at 10:10pm", username: "Kevin", src: "https://bit.ly/sage-adebayo"},
        { filename: "Image.png", time: "Aug 25th at 10:10pm", username: "Kevin", src: "https://bit.ly/sage-adebayo"},
        { filename: "Image.png", time: "Aug 25th at 10:10pm", username: "Kevin", src: "https://bit.ly/sage-adebayo"},
        { filename: "Image.png", time: "Aug 25th at 10:10pm", username: "Kevin", src: "https://bit.ly/sage-adebayo"}
    ]

    let fileElements = files.map(file => {
        return (
            <Box>
            <Flex flexDirection="row" mb='2'>
                    {/* <Image borderRadius="full" boxSize="36px" src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/> */}
                    <Image borderRadius="full" boxSize="36px" src="{file.src}" alt="Segun Adebayo"/>

                    
                    <Flex flexDirection='column' ml='6' >
                        <Text fontWeight='bold' fontSize='12px' color='#333333'>{file.filename}</Text>
                        <Flex flexDirection='row' alignItems='center' justifyContent='center'>
                            <Text fontSize='8px' mr='8px' fontWeight='bold' color='#717171'>{file.username}</Text>
                            <Text fontSize='8px' color='#717171'>{file.time}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            <Divider orientation="horizontal" />
            </Box>
        )
    })

    return (
        <Box position='absolute' px={8} pt='3' rounded="sm" width='510px' height='343px' left='50px' top='473px' backgroundColor='#FFFFFF' border='1px solid #EBEBEB'>
            <Flex flexDirection='column'>
                <Text fontWeight="bold" fontSize="12px" color='#333333' mb='2'>Files</Text>

                {fileElements}

                <Flex flexDirection="row" my='2'>
                    <Image borderRadius="full" boxSize="36px" src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" />

                    <Flex flexDirection='column' ml='6' >
                        <Text fontWeight='bold' fontSize='12px' color='#333333'>Image.png</Text>
                        <Flex flexDirection='row' alignItems='center' justifyContent='center'>
                            <Text fontSize='8px' mr='8px' fontWeight='bold' color='#717171'>Kevin</Text>
                            <Text fontSize='8px' color='#717171'>Aug 25th at 6.30AM</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Text fontSize='12px' fontWeight="bold" color='#00AD75' as="a" href="" >Show more</Text>
            </Flex>

        </Box>


    )

}

export default FileList

