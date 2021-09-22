import React, { useState } from "react";
import { Flex} from "@chakra-ui/layout";
import { Box, Button,Input} from "@chakra-ui/react";
import { IoFlashOutline, IoSendSharp } from "react-icons/io5";
import { BsTypeBold, BsLink45Deg } from "react-icons/bs";
import { FiAtSign, FiItalic } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import {GrEmoji } from "react-icons/gr";
import {RiArrowDropDownLine} from 'react-icons/ri';
import {ImAttachment} from 'react-icons/im';
import Picker from "emoji-picker-react";
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
    const [italic,setItalic]=useState("");
    const [list, setList]=useState("");
    const [emoji,setEmoji]=useState(false)

    const datas={
      user_id:"thanos",
      content:data
    }


    const dispatch=useDispatch();
    const {_sendMessage} = bindActionCreators(appActions,dispatch);

    const {sendMessages} = useSelector((state)=>state.channelsReducer)
    // console.log(sendMessages);

    const loadData=async ()=>{
      const org_id = '1';//Test value for org id
      const channel_id = "613f70bd6173056af01b4aba"; // Hardcoded value to for channel_id in org with id 1
      await _sendMessage(org_id,channel_id,datas)
      setData('');
    }
    const changeWeight=(e)=>{
      const active=e.target
      // let cmd=active.dataset['command'];
      // const trial=document.execCommand(cmd,false,null);
      let cmd=active.dataset['command'];
      !toggle ? setActive(cmd) : setActive(" ");

      setToggle(!toggle)
      return cmd;
    }
    // const insertList=(e)=>{
    //   const active=e.target
    //   let cmd=active.dataset['command'];
    //   !toggle ? setList(cmd) : setList(" ");
    //   setToggle(!toggle);
    //   return cmd
    // }
    const addTag = () => {
      const cursor = textRef.current.selectionStart;
      const text =
        data.slice(0, cursor) + '@' + data.slice(cursor);
      setData(text);
    }
    const onEmojiClick = (event, emojiObject) => {
      const cursor = textRef.current.selectionStart;
      const text =
        data.slice(0, cursor) + emojiObject.emoji + data.slice(cursor);
      setData(text);
    }
    const changeStyle=(e)=>{
      const active=e.target
      let cmd=active.dataset['command'];
      !toggle ? setItalic(cmd) : setItalic(" ");
  
      setToggle(!toggle)
      return cmd;
    }

    return (
      <Box border="1px solid #EBEBEB" bg="white" borderRadius="3px" width="100%"
      css={{
        '&::-webkit-scrollbar':{
          display:'none'
        }
      }}>
          {
            emoji && <Picker onEmojiClick={onEmojiClick}/>
          }
        <Box display={['none','block']}>
        <ResizableInput
          textareaRef={textRef}
          border="none"
          fontSize="15px"
          color="neutral.500"
          placeholder="Message #announcement"
          _placeholder={{ color: "neutral.500" }}
          paddingBlock="18px"
          paddingInline="20px"
          _focus={{ border: "none" }}
          onInput={()=>setInput(true)}
          fontWeight={active}
          fontStyle={italic}
          listStyleType={list}
          value={data}
          height="58px"
          changeText={(e)=>setData(e.target.value)}
        />
          <Box
          maxW="100%"
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          overflowX="auto"
          p={1}
          onClick={()=>setInput(true)}
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
            <AiOutlineBars data-command="insertUnorderedList"/>
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
            <FiAtSign onClick={addTag} className="tagged"/>
            <Input type="file" style={{display:'none'}} id="contained-button-file" name="contained-button-file"/>
            <label for="contained-button-file"><ImAttachment/></label>
            <GrEmoji onClick={()=>setEmoji(!emoji)}/>
            {(input || data!== "") ? (
              <Button bg="#00B87C" size="xs">
                <IoSendSharp color="white"  onClick={loadData}/>
              </Button>
            ) : (
              <Button size="xs" disabled><IoSendSharp /></Button>
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
              <ResizableInput variant="unstyled" placeholder="Message #announcement" textareaRef={textRef} value={data}
              fontWeight={active} fontStyle={italic}
               onInput={()=>setInput(true)} changeText={(e)=>setData(e.target.value)}/>
              {
                (input || data!== "") ?<IoSendSharp color="black" onClick={loadData}/> : <Button size="xs" disabled><IoSendSharp /></Button>
              }
            </Flex>
            <Flex minW="10em" justify="space-between" mt={1}>
              <IoFlashOutline/>
              <HSeparatorIcon/>
              <GrEmoji onClick={()=>setEmoji(!emoji)} />
              <BsTypeBold className="box" onClick={changeWeight} data-command="bold"/>
              <FiItalic className="box" onClick={changeStyle} data-command="italic"/>
              <BsLink45Deg />
              <AiOutlineBars data-command="insertUnorderedList"/>
              <FiAtSign onClick={addTag} className="tagged"/>
              <label for="contained-button-file"><ImAttachment/></label>
              <Input type="file" style={{display:'none'}} id="contained-button-file" name="contained-button-file"/>
            </Flex>
          </Box>
          :
          <Box display={["flex","none"]} flexDirection="row" alignItems="center" overflowX="auto"
          maxW="100%"
          css={{
            '&::-webkit-scrollbar':{
              display:'none'
            }
          }} onClick={()=>setOnclick(true)}>
              <ResizableInput variant="unstyled" placeholder="Message #announcement" textareaRef={textRef} value={data}
               onInput={()=>setInput(true)} changeText={(e)=>setData(e.target.value)} fontWeight={active} fontStyle={italic}/>
            <Box>
              <Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between" minW="80px">
              <AiOutlineBars data-command="insertUnorderedList"/>
              <FiAtSign onClick={addTag} className="tagged"/>
              <label for="contained-button-file"><ImAttachment/></label>
              <Input type="file" style={{display:'none'}} id="contained-button-file" name="contained-button-file"/>
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