import React, { useState, useEffect } from "react";
import { Divider, Flex, Container, Text } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { IoFlashOutline, IoSendSharp } from "react-icons/io5";
import { BsTypeBold, BsLink45Deg } from "react-icons/bs";
import { FiAtSign, FiItalic } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImAttachment } from "react-icons/im";
import { useRef } from "react";
import { Textarea } from "@chakra-ui/textarea";
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import MultimediaSharingModal from "./MultimediaSharingModal";
import { useDisclosure } from "@chakra-ui/hooks";
import AddEmojiModal from "./addEmojiModal";
import _ from "lodash";

const MessageInput = ({ channelId}) => {
  // const {
  //   channelsReducer: { channelDetails },
  // } = useSelector((state) => state);
  const { users } = useSelector((state) => state.appReducer);
  // const [orgId, setOrgId] = useState([]);

  const textRef = useRef(null);
  const [data, setData] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [click, setOnClick] = useState(false);
  const [input, setOnInput] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("");
  const [italic, setItalic] = useState("");
  const {
    isOpen: isMulimediaOpen,
    onOpen: onMulimediaOpen,
    onClose: onMulimediaClose,
  } = useDisclosure();
  const {
    isOpen: isAddEmojiOpen,
    onOpen: onAddEmojiOpen,
    onClose: onAddEmojiClose,
  } = useDisclosure();

  // let newChannelId = channelId;

  // useEffect(() => {
  //   if (users) {
  //     setOrgId(users[0]);
  //   }
  // }, [users]);

  // const datas = {
  //   user_id: orgId?._id,
  //   content: data,
  // };
  //For Post Request
  const dispatch = useDispatch();
  const { _sendMessage } = bindActionCreators(appActions, dispatch);

  const { sendMessages } = useSelector((state) => state.channelsReducer);
  // console.log(sendMessages);

  // let _users;
  // let org_id;

  // useEffect(() => {
  //   _users = users;
  //   org_id = _users.currentWorkspace;
  //   console.log("this is the orgId message input", org_id);
  // });

  const loadData = async () => {
    // const channel_id = newChannelId;
    const payload = {
      user_id: users["0"]._id,
      content: data
    }
    await _sendMessage(users.currentWorkspace, channelId, payload);
    console.log("data sent === ", data);
    setData("");
  };

  const addTag = () => {
    const cursor = textRef.current.selectionStart;
    const text = data.slice(0, cursor) + "@" + data.slice(cursor);
    setData(text);
  };

  const changeStyle = (e) => {
    const active = e.target;
    let cmd = active.dataset["command"];
    !toggle ? setItalic(cmd) : setItalic(" ");

    setToggle(!toggle);
    return cmd;
  };
  const onEmojiClick = (event, emojiObject) => {
    const cursor = textRef.current.selectionStart;
    const text = data.slice(0, cursor) + emojiObject.emoji + data.slice(cursor);
    setData(text);
  };
  const togglingDisplay = () => {
    setOnClick(false);
    setEmoji(false);
  };
  const changeWeight = (e) => {
    const active = e.target;
    const value = e.target.value;
    let cmd = active.dataset["command"];
    !toggle ? setActive(cmd) : setActive(" ");
    setToggle(!toggle);
  };
  const formatSelection = (ch, tag) => {
    var sel, range, replacementText;
    var formatElement = document.createElement(tag);
    if (document.activeElement.nodeName.toLowerCase !== "textarea") return;
    if (window.getSelection) {
      // if it is supported
      sel = window.getSelection(); // get the Selection object
      formatElement.appendChild(document.createTextNode(sel.toString()));
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(formatElement);
      } else {
        sel.deleteFromDocument();
      }
    } else if (document.selection && document.selection.createRange) {
      sel = document.selection;
      range = document.selection.createRange();
      formatElement.appendChild(document.createTextNode(sel.toString()));
      range.deleteContents();
      range.insertNode(formatElement);
    }
  };

  // you can use the function like
  formatSelection("b"); // for bold
  formatSelection("strike"); // for strike through
  return (
    <>
    {/* <CommentBox  sendMessageHandler={console.log} /> */}
    {/* <MessageBoard /> */}
    </>
    // <Box
    //   border="1px solid #EBEBEB"
    //   borderRadius="4px"
    //   marginBottom="10px"
    //   onMouseLeave={togglingDisplay}
    //   css={{
    //     "&::-webkit-scrollbar": {
    //       display: "none",
    //     },
    //   }}
    // >
    //   <AddEmojiModal isOpen={isAddEmojiOpen} onClose={onAddEmojiClose} />
    //   <Modal
    //     isOpen={isMulimediaOpen}
    //     onClose={onMulimediaClose}
    //     size="xs"
    //     isCentered="true"
    //     pb={0}
    //   >
    //     <ModalOverlay />
    //     <ModalContent bottom="-5.6rem" left="3.6rem" maxW="20rem">
    //       <MultimediaSharingModal />
    //     </ModalContent>
    //   </Modal>
    //   {emoji && (
    //     <Container
    //       boxShadow="-1px 4px 7px rgba(0, 0, 0, 0.1)"
    //       bg="#F9F9F9"
    //       textAlign="left"
    //       maxWidth="300px"
    //       style={{ position: "absolute", top: "10rem", right: "2rem" }}
    //     >
    //       <Picker
    //         pickerStyle={{
    //           width: "300px",
    //           height: 300,
    //           Searchbar: {
    //             borderRadius: 20,
    //           },
    //           fontSize: 10,
    //         }}
    //         onEmojiClick={onEmojiClick}
    //       />
    //       <Container p="18px" alignSelf="center">
    //         <Text
    //           alignItems="center"
    //           mt="10px"
    //           mb="10px"
    //           fontSize="18px"
    //           color="#8B8B8B"
    //           fontWeight="600"
    //         >
    //           Frequently Used
    //         </Text>
    //         <Box>
    //           <Button
    //             mt="10px"
    //             color="#8B8B8B"
    //             fontSize="18px"
    //             p="7px 11px"
    //             border="1px solid #8B8B8B"
    //             borderRadius="3px"
    //             boxSizing="border-box"
    //             bg="white"
    //             onClick={onAddEmojiOpen}
    //           >
    //             Add Emoji
    //           </Button>
    //         </Box>
    //       </Container>
    //     </Container>
    //   )}
    //   <Box display={["none", "block"]}>
    //     <ResizableInput
    //       textareaRef={textRef}
    //       border="none"
    //       fontSize="15px"
    //       color="neutral.500"
    //       placeholder="Message #announcements"
    //       _placeholder={{ color: "neutral.500" }}
    //       paddingBlock="18px"
    //       paddingInline="20px"
    //       _focus={{ border: "none" }}
    //       value={data}
    //       height="50px"
    //       changeText={(e) => setData(e.target.value)}
    //       onInput={() => setOnInput(true)}
    //       fontWeight={active}
    //       fontStyle={italic}
    //       onMouseDown={formatSelection}
    //       onBlur={() => setOnInput(false)}
    //     />
    //     <Box
    //       display="flex"
    //       justifyContent="space-between"
    //       alignItems="center"
    //       m={3}
    //     >
    //       <Box
    //         display="flex"
    //         _hover={{ cursor: "pointer" }}
    //         minW="80px"
    //         width="7em"
    //         justifyContent="space-between"
    //       >
    //         <IoFlashOutline />
    //         <Divider orientation="vertical" height="20px" color="gray.500" />
    //         <BsTypeBold
    //           className="box"
    //           data-command="bold"
    //           onClick={changeWeight}
    //         />
    //         <FiItalic
    //           className="box"
    //           data-command="italic"
    //           onClick={changeStyle}
    //         />
    //         <BsLink45Deg />
    //         <AiOutlineBars data-command="insertUnorderedList" />
    //       </Box>
    //       <Box
    //         display="flex"
    //         _hover={{ cursor: "pointer" }}
    //         alignItems="center"
    //         minW="80px"
    //         width="10em"
    //         justifyContent="space-between"
    //       >
    //         <FiAtSign className="tagged" onClick={addTag} />
    //         <ImAttachment onClick={onMulimediaOpen} />
    //         <GrEmoji onClick={() => setEmoji(!emoji)} />
    //         {input || data !== "" ? (
    //           <IoSendSharp color="black" onClick={loadData} />
    //         ) : (
    //           <Button size="xs" disabled>
    //             <IoSendSharp />
    //           </Button>
    //         )}
    //         <Divider orientation="vertical" height="20px" color="gray.500" />
    //         <RiArrowDropDownLine size="30px" />
    //       </Box>
    //     </Box>
    //   </Box>
    //   <Box
    //     display={["flex", "none"]}
    //     overflowX="auto"
    //     alignItems="center"
    //     css={{
    //       "&::-webkit-scrollbar": {
    //         display: "none",
    //       },
    //     }}
    //   >
    //     {click ? (
    //       <Box display="flex" flexDir="column" width="100%" mx={2}>
    //         <Flex
    //           width="100%"
    //           dir="row"
    //           justify="space-between"
    //           alignItems="center"
    //           minW="12em"
    //         >
    //           <ResizableInput
    //             textareaRef={textRef}
    //             border="none"
    //             fontSize="15px"
    //             color="neutral.500"
    //             placeholder="Message #announcement"
    //             _placeholder={{ color: "neutral.500" }}
    //             paddingBlock="18px"
    //             paddingInline="20px"
    //             _focus={{ border: "none" }}
    //             value={data}
    //             height="58px"
    //             changeText={(e) => setData(e.target.value)}
    //             onInput={() => setOnInput(true)}
    //             fontWeight={active}
    //             fontStyle={italic}
    //             onBlur={() => setOnInput(false)}
    //           />
    //           {input || data !== "" ? (
    //             <Button bg="#00B87C" size="xs">
    //               <IoSendSharp color="white" onClick={loadData} />
    //             </Button>
    //           ) : (
    //             <Button size="xs" disabled>
    //               <IoSendSharp />
    //             </Button>
    //           )}
    //         </Flex>
    //         <Flex
    //           justifyContent="space-between"
    //           width="12em"
    //           m="10px"
    //           _hover={{ cursor: "pointer" }}
    //         >
    //           <IoFlashOutline />
    //           <GrEmoji onClick={() => setEmoji(!emoji)} />
    //           <BsTypeBold
    //             data-command="bold"
    //             className="box"
    //             onClick={changeWeight}
    //           />
    //           <FiItalic
    //             data-command="italic"
    //             className="box"
    //             onClick={changeStyle}
    //           />
    //           <BsLink45Deg />
    //           <AiOutlineBars />
    //           <FiAtSign onClick={addTag} />
    //           <ImAttachment onClick={onMulimediaOpen} />
    //         </Flex>
    //       </Box>
    //     ) : (
    //       <Box
    //         display="flex"
    //         flexDirection="row"
    //         alignItems="center"
    //         justifyContent="space-between"
    //         width="100%"
    //         onClick={() => setOnClick(true)}
    //       >
    //         <ResizableInput
    //           border="none"
    //           fontSize="15px"
    //           color="neutral.500"
    //           placeholder="Message #announcement"
    //           _placeholder={{ color: "neutral.500" }}
    //           _focus={{ border: "none" }}
    //           value={data}
    //           paddingBlock="18px"
    //           height="58px"
    //           changeText={(e) => setData(e.target.value)}
    //           onInput={() => setOnInput(true)}
    //         />
    //         <Flex minW="6em" justifyContent="space-around" alignItems="center">
    //           <AiOutlineBars data-command="insertUnorderedList" />
    //           <FiAtSign className="tagged" onClick={addTag} />
    //           <ImAttachment onClick={onMulimediaOpen} />
    //         </Flex>
    //       </Box>
    //     )}
    //   </Box>
    // </Box>
  );
};

const MAX_HEIGHT = 200;
const MIN_HEIGHT = 58;

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
      id="input"
      name="input"
    />
  );
};
export default MessageInput;