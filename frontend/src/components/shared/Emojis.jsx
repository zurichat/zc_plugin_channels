import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

function Emojis() {

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div style={{position: 'absolute', marginTop: -300}}>
      {chosenEmoji ? (
        <span>{chosenEmoji.emoji}</span>
      ) : (
        <span>Pick an Emoji</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default Emojis

