import { Box, HStack, Text } from '@chakra-ui/layout';
import React from 'react';
import { TiPin } from 'react-icons/ti'
import { BsPlus } from 'react-icons/bs'


const PinAndBookmarkDisplay = () => {
    return (
        <HStack bg="#E1FDF4" px="1rem" py="5px" spacing="5px">
            <HStack bg="#BCF9E6" px="10px" py="4.5px" spacing="5px" borderRadius="4px" cursor="pointer">
                <TiPin transform="scale(-1, 1)" fill="#1D1C1D" />
                <Text color="#1D1C1D" fontSize="13px">3 Pinned</Text>
            </HStack>
            <HStack bg="#BCF9E6" px="10px" py="4.5px" spacing="5px" borderRadius="4px" cursor="pointer">
                <BsPlus fill="#1D1C1D" />
                <Text color="#1D1C1D" fontSize="13px">Add a Bookmark</Text>
            </HStack>
        </HStack>
    )
}

export default PinAndBookmarkDisplay;