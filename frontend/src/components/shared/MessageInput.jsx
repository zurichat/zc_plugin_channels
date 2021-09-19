import React, { useEffect, useState } from "react";
import { Flex, HStack, Spacer, Square, Stack } from "@chakra-ui/layout";
import { Box, Divider, Input, Button} from "@chakra-ui/react";
import { IoFlashOutline, IoSendSharp } from "react-icons/io5";
import { BsTypeBold, BsLink45Deg } from "react-icons/bs";
import { FiAtSign, FiItalic } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import {GrEmoji } from "react-icons/gr";
import {RiArrowDropDownLine} from 'react-icons/ri';
import {ImAttachment} from 'react-icons/im';
import { useRef } from "react";
import { Textarea } from "@chakra-ui/textarea";
import { useDispatch,useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";


const MessageInput = () =>{
    const textRef = useRef(null);
    const [input, setInput] = useState(false);
    const [data,setData]=useState('');
    const [click,setOnclick]=useState(false);
    const [toggle,setToggle]=useState(false);
    const [active,setActive]=useState("");
    const [italic,setItalic]=useState("")
    const datas={
      user_id:"thanos",
      content:data
    }

    const dispatch=useDispatch();
    const {_sendMessage} = bindActionCreators(appActions,dispatch);

    const {sendMessages} = useSelector((state)=>state.appReducer)
    // console.log(sendMessages);

    const loadData=async ()=>{
      await _sendMessage('1','613f70bd6173056af01b4aba',datas)
      setData('')
    }
    const changeWeight=(e)=>{
      const active=e.target
      let cmd=active.dataset['command'];
      !toggle ? setActive(cmd) : setActive(" ");
      const trial=e.target.value
      
      setToggle(!toggle)
    }
    const changeStyle=(e)=>{
      const active=e.target
      let cmd=active.dataset['command'];
      !toggle ? setItalic(cmd) : setItalic(" ");
  
      setToggle(!toggle)
    }
    // useEffect(()=>{
    //   loadData()
    // },[]);

    return (
      <Box border="1px solid #EBEBEB" bg="white" borderRadius="3px" width="100%"
      css={{
        '&::-webkit-scrollbar':{
          display:'none'
        },
      }}>
        <Box display={['none','block']}>
        <ResizableInput
          textareaRef={textRef}
          value={data}
          changeText={(e)=>setData(e.target.value)}
          height="58px"
          border="none"
          fontSize="15px"
          color="neutral.500"
          placeholder="Send a message to John"
          _placeholder={{ color: "neutral.500" }}
          paddingBlock="18px"
          paddingInline="20px"
          _focus={{ border: "none" }}
          onInput={()=>setInput(true)}
          onMouseOut={()=>setInput(false)}
          fontWeight={active}
          fontStyle={italic}
        />
          <Box
          maxW="100%"
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          overflowX="auto"
          p={1}
        >
          <Box
            width="10em"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            _hover={{ cursor: "pointer"}}
          >
            <IoFlashOutline/>
            <HSeparatorIcon/>
            <BsTypeBold  className="box" onClick={changeWeight} data-command="bold"/>
            <FiItalic className="box" onClick={changeStyle} data-command="italic"/>
            <BsLink45Deg />
            <AiOutlineBars />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width={{ base: "10em", sm: "8em", md: "10em" }}
            _hover={{ cursor: "pointer" }} marginLeft={['30px']}
            minW="120px"
            css={{
              '&::-webkit-scrollbar':{
                display:'none'
              }
            }}
          >
            <FiAtSign />
            <ImAttachment/>
            <GrEmoji/>
            {input ? (
              <Button bg="#00B87C" size="xs">
                <IoSendSharp color="white"  onClick={loadData}/>
              </Button>
            ) : (
              <Button size="xs"><IoSendSharp onClick={loadData}/></Button>
            )}
            <HSeparatorIcon/>
            <RiArrowDropDownLine size="30px"/>
          </Box>
        </Box>
      </Box>
      <Box display={["flex","none"]} maxH="94px" flexDir="column" justifyContent="space-between" p={3}
      overflowX="auto">
        {
          click ? 
          <Box display="flex" flexDir="column" justifyContent="space-between">
            <Flex justify="space-between" width="100%" minW="10em">
              <ResizableInput variant="unstyled" placeholder="Send a Message" textareaRef={textRef} 
              onMouseOut={()=>setOnclick(false)} onInput={()=>setInput(true)} changeText={(e)=>setData(e.target.value)}/>
              {
                input ?<IoSendSharp color="black" onClick={loadData}/> : <Button size="xs"><IoSendSharp onClick={loadData}/></Button>
              }
            </Flex>
            <Flex width="10em" justify="space-between" mt={1}>
              <IoFlashOutline/>
              <HSeparatorIcon/>
              <GrEmoji/>
              <BsTypeBold className="box" onClick={changeWeight} data-command="bold"/>
              <FiItalic className="box" onClick={changeStyle} data-command="italic"/>
              <BsLink45Deg/>
              <AiOutlineBars/>
              <FiAtSign/>
              <ImAttachment/>
            </Flex>
          </Box>
          :
          <Box display={["flex","none"]} flexDirection="row" alignItems="center" overflowX="auto"
          maxW="100%"
          css={{
            '&::-webkit-scrollbar':{
              display:'none'
            }
          }}>
              <ResizableInput variant="unstyled" placeholder="Send a Message" textareaRef={textRef}
              onMouseDown={()=>setOnclick(true)} onInput={()=>setInput(true)} changeText={(e)=>setData(e.target.value)}/>
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
    </Box>

    );
  };
  
  const MAX_HEIGHT = 200;
  const MIN_HEIGHT = 58;
  
  const HSeparatorIcon = () => (
    <svg
      width="2"
      height="18"
      viewBox="0 0 2 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1V17" stroke="#EBEBEB" strokeLinecap="round" />
    </svg>
  );
  
  const ResizableInput = ({
    textareaRef,
    changeText,
    onKeyUp = null,
    onBlur = null,
    onFocus = null,
    ...rest
  }) => {
    const fitToContent = (maxHeight) => {
      const text = textareaRef?.current;
      if (!text) return;
  
      var adjustedHeight = text.clientHeight;
      if (!maxHeight || maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
        if (maxHeight) adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight === maxHeight)
          textareaRef.current.style.overflowY = "auto";
        if (adjustedHeight > text.clientHeight)
          text.style.height = adjustedHeight + "px";
      }
    };
    const keyUpEventHandler = () => {
      if (onKeyUp) onKeyUp();
      fitToContent(MAX_HEIGHT);
    };
    const blurEventHandler = () => {
      if (onBlur) onBlur();
      textareaRef.current.style.height = MIN_HEIGHT + "px";
      textareaRef.current.scrollTo(0, 0);
      textareaRef.current.style.overflowY = "hidden";
    };
    const focusEventHandler = () => {
      if (onFocus) onFocus();
      fitToContent(MAX_HEIGHT);
    };
    return (
      <Textarea
        ref={textareaRef}
        {...rest}
        onKeyUp={keyUpEventHandler}
        onFocus={focusEventHandler}
        onBlur={blurEventHandler}
        onChange={changeText}
        resize="none"
        rows="1"
        overflowY="hidden"
      />
    );
}

export default MessageInput;