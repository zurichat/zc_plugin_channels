import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { Container, Box } from "@chakra-ui/react"

function Emojis() {

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <Container style={{position: 'absolute', marginTop: -300}}>
      {chosenEmoji ? (
        <Box>The Emoji choosed is {chosenEmoji.emoji}</Box> // this is where the value of the emoji called will display, and you can get the value through this.
      ) : (
        <Box>Pick an Emoji</Box>
      )}
      {/* this is the emoji component itself, and you will be able to click the component from here and get the value of the emoji clickes with the onEmojiClick hooks. */}
      <Picker onEmojiClick={onEmojiClick} /> 
    </Container>
  );
};

export default Emojis

