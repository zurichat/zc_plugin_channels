import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import CreateChannelModal from "../createChannel/createChannelModal";

const FloatingButton = () => {
    return (
    <Box 
            pos="fixed"
            bottom="25"
            right="23px"
            zIndex={9999}
    >
        <AddIcon
            bgColor="#00B87C"
            color="white"
            w="50px"
            h="50px"
            p="3"
            borderRadius="50%"
            display="none"
            sx={{ "@media screen and (max-width: 768.5px)": { display: "block" } }}
        />
    </Box>
    )
} 

export default FloatingButton;