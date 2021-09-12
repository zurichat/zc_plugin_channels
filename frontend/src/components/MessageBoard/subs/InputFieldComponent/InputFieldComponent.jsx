import React, { useState } from "react";
import { Box, Divider, Input, Button } from "@chakra-ui/react";
import { IoFlashOutline, IoSendSharp } from "react-icons/io5";
import { BsTypeBold, BsLink45Deg } from "react-icons/bs";
import { FiAtSign, FiItalic } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";

function InputFieldComponent() {
  const [input, setInput] = useState(false);
  return (
    <Box p={3}>
      <Box display="flex" flexDirection="column" borderWidth="1px" p={3} height="94px">
        <Input
          variant="unstyled"
          placeholder="Send a Message"
          size="lg"
          fontSize="md"
          onInput={() => setInput(true)}
          onMouseOut={() => setInput(false)}
        />
        <Box
          maxW="100%"
          display="flex"
          justifyContent="space-between"
          mt={7}
          flexDirection="row"
          alignItems="center"
          overflowX="auto"
          css={{
            '&::-webkit-scrollbar':{
              display:'none'
            }
          }}
        >
          <Box
            width={{ base: "7em", sm: "10em", md: "12em" }}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            _hover={{ cursor: "pointer" }}
          >
            <IoFlashOutline />
            <Divider height="20px" color="gray.500" orientation="vertical" />
            <BsTypeBold />
            <FiItalic />
            <BsLink45Deg />
            <AiOutlineBars />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width={{ base: "5em", sm: "8em", md: "10em" }}
            _hover={{ cursor: "pointer" }} marginLeft={['30px']}
            minW="60px"
          >
            <FiAtSign />
            <GrAttachment color="#8B8B8B"/>
            {input ? (
              <Button bg="#00B87C" size="xs">
                <IoSendSharp color="white" />
              </Button>
            ) : (
              <IoSendSharp />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default InputFieldComponent;
