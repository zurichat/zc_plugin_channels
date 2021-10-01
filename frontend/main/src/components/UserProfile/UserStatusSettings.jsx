import React, {useState} from 'react'
import Picker from "emoji-picker-react";
import {Box } from "@chakra-ui/react"

const UserStatusSettings = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState();

  const handleClick = () => {
    setShowPicker(!showPicker)
  }
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  }

  return (
    <Box onClick={handleClick} cursor="pointer">
      {chosenEmoji ? chosenEmoji.emoji : "No emoji"}
      {showPicker && <Picker onEmojiClick={onEmojiClick} /> }
    </Box>
  )
}

export default UserStatusSettings;