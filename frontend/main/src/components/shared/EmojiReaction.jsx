import React, { useState, useRef } from "react";
import Picker from "emoji-picker-react";
import { Stack, Container, Box } from "@chakra-ui/react"


export default function App() {
  const [message, setMessageForm] = useState("");
  const ref = useRef(null);
  const onEmojiClick = (event, emojiObject) => {
    const cursor = ref.current.selectionStart;
    const text = emojiObject.emoji;
    setMessageForm(text);
  };
  const [count, setCount] = useState(null);

  return (
    <Stack>
      
      <Picker onEmojiClick={onEmojiClick} />
      <Box cursor="pointer" alignItems="center" onClick={() => setCount(count + 1)} display="flex">
      <Container
        ref={ref}
        onChange={e => setMessageForm(e.target.value)}
      >{message}</Container><h4>{count + 1}</h4>
      </Box>
    </Stack>
  );
}