import React, { useState } from "react";
import { Box, Divider, Input, Button} from "@chakra-ui/react";
import { IoFlashOutline, IoSendSharp } from "react-icons/io5";
import { BsTypeBold, BsLink45Deg } from "react-icons/bs";
import { FiAtSign, FiItalic } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import {GrEmoji } from "react-icons/gr";
import {RiArrowDropDownLine} from 'react-icons/ri';
import {ImAttachment} from 'react-icons/im';

function InputFieldComponent() {
  const [input, setInput] = useState(false);
  const [click,setOnclick]=useState(false);
  return (
    <Box p={3}>
      <Box display={["none","flex"]} flexDirection="column" borderWidth="1px" p={3} height="100px">
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
          mt={5}
          flexDirection="row"
          alignItems="center"
          overflowX="auto"
          css={{
            '&::-webkit-scrollbar':{
              display:'none'
            },
          }}
        >
          <Box
            width={{ base: "7em", sm: "10em", md: "12em" }}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            _hover={{ cursor: "pointer"}}
          >
            <IoFlashOutline/>
            <Divider height="20px" orientation="vertical"/>
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
            <ImAttachment/>
            <GrEmoji/>
            {input ? (
              <Button bg="#00B87C" size="xs">
                <IoSendSharp color="white" />
              </Button>
            ) : (
              <Button size="xs" disabled><IoSendSharp /></Button>
            )}
            <Divider height="20px" color="gray.500" orientation="vertical"/>
            <RiArrowDropDownLine size="30px"/>
          </Box>
        </Box>
      </Box>
      {
              click ? 
              <Box display={["flex","none"]} flexDirection="column" borderWidth="1px" p={3} maxH="94px" overflowX="auto"
              maxW="100%"
              css={{
                '&::-webkit-scrollbar':{
                  display:'none'
                }
              }}>
                <Box display="flex" flexDir="row" alignItems="center" minW="10em" justifyContent="space-between">
                <Input variant="unstyled" placeholder="Send a message" size="lg" fontSize="md"
                 onInput={()=>setInput(true)} onMouseOut={()=>setInput(false), ()=>setOnclick(false)}/>
                  {
                  input ?<IoSendSharp color="black"/> : <Button size="xs" disabled><IoSendSharp /></Button>
                  }
                </Box>
                  <Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between" width="10em" marginTop="25px" overflowX="auto">
                    <IoFlashOutline/>
                    <Divider height="20px" color="gray.500" orientation="vertical"/>
                    <GrEmoji/>
                    <BsTypeBold/>
                    <FiItalic/>
                    <BsLink45Deg/>
                    <AiOutlineBars/>
                    <FiAtSign/>
                    <ImAttachment/>
                  </Box>
                </Box>
               :
        <Box display={["flex","none"]} flexDirection="row" borderWidth="1px" p={3} maxH="94px" alignItems="center" overflowX="auto"
        maxW="100%"
        css={{
          '&::-webkit-scrollbar':{
            display:'none'
          }
        }}>
          <Input variant="unstyled" placeholder="Send a message" size="lg" fontSize="md"
           onMouseOver={()=>setOnclick(true)} onInput={()=>setInput(true)} onMouseOut={()=>setInput(false)}/>
          <Box>
            <Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between" width="80px">
            <AiOutlineBars/>
            <FiAtSign/>
            <ImAttachment/>
            </Box>
          </Box>
        </Box>
        }
    </Box>
  );
}

export default InputFieldComponent;
