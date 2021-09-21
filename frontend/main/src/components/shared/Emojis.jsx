import React, { useState, useRef } from "react";
import Picker from "emoji-picker-react";
import { Input } from "@chakra-ui/react"


export default function App() {
  const [message, setMessageForm] = useState("");
  const ref = useRef(null);
  const onEmojiClick = (event, emojiObject) => {
    const cursor = ref.current.selectionStart;
    const text =
      message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor);
    setMessageForm(text);
  };

  return (
    <div>
      
      <Picker onEmojiClick={onEmojiClick} />
      <Input
        id="text"
        ref={ref}
        type="text"
        placeholder="Type your message"
        value={message}
        onKeyPress={e => {
          if (e.key !== "Enter") return;
          console.log(message);
        }}
        onChange={e => setMessageForm(e.target.value)}
      />
    </div>
  );
}