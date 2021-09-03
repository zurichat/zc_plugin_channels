import React from 'react'
import { Box, Flex, HStack, Spacer, Square, Stack } from '@chakra-ui/layout'
import {
  FiAtSign,
  FiBold,
  FiItalic,
  FiLink,
  FiList,
  FiPaperclip,
  FiSend,
  FiZap,
} from 'react-icons/fi'
import { useRef } from 'react'
import { Textarea } from '@chakra-ui/textarea'

const MessageInput = () => {
  const textRef = useRef(null)

  return (
    <Box border='1px solid #EBEBEB' bg='white' borderRadius='3px' width='100%'>
      <ResizableInput
        textareaRef={textRef}
        height='58px'
        border='none'
        fontSize='15px'
        color='neutral.500'
        placeholder='Send a message to John'
        _placeholder={{ color: 'neutral.500' }}
        paddingBlock='18px'
        paddingInline='20px'
        _focus={{ border: 'none' }}
      />
      <Flex paddingTop='5px' paddingBottom='10px' paddingInline='20px'>
        <HStack spacing='5px'>
          <Square size='24px'>
            <FiZap />
          </Square>
          <HSeparatorIcon />
          <Square size='24px'>
            <FiBold />
          </Square>
          <Square size='24px'>
            <FiItalic />
          </Square>
          <Square size='24px'>
            <FiLink />
          </Square>
          <Square size='24px'>
            <FiList />
          </Square>
        </HStack>
        <Spacer />
        <Stack direction='row-reverse' spacing='5px'>
          <Square size='24px'>
            <FiSend />
          </Square>
          <Square size='24px'>
            <FiPaperclip />
          </Square>
          <Square size='24px'>
            <FiAtSign />
          </Square>
        </Stack>
      </Flex>
    </Box>
  )
}

const MAX_HEIGHT = 200
const MIN_HEIGHT = 58

const HSeparatorIcon = () => (
  <svg
    width='2'
    height='18'
    viewBox='0 0 2 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M1 1V17' stroke='#EBEBEB' strokeLinecap='round' />
  </svg>
)

const ResizableInput = ({
  textareaRef,
  onKeyUp = null,
  onBlur = null,
  onFocus = null,
  ...rest
}) => {
  const fitToContent = maxHeight => {
    const text = textareaRef?.current
    if (!text) return

    var adjustedHeight = text.clientHeight
    if (!maxHeight || maxHeight > adjustedHeight) {
      adjustedHeight = Math.max(text.scrollHeight, adjustedHeight)
      if (maxHeight) adjustedHeight = Math.min(maxHeight, adjustedHeight)
      if (adjustedHeight === maxHeight)
        textareaRef.current.style.overflowY = 'auto'
      if (adjustedHeight > text.clientHeight)
        text.style.height = adjustedHeight + 'px'
    }
  }
  const keyUpEventHandler = () => {
    if (onKeyUp) onKeyUp()
    fitToContent(MAX_HEIGHT)
  }
  const blurEventHandler = () => {
    if (onBlur) onBlur()
    textareaRef.current.style.height = MIN_HEIGHT + 'px'
    textareaRef.current.scrollTo(0, 0)
    textareaRef.current.style.overflowY = 'hidden'
  }
  const focusEventHandler = () => {
    if (onFocus) onFocus()
    fitToContent(MAX_HEIGHT)
  }
  return (
    <Textarea
      ref={textareaRef}
      {...rest}
      onKeyUp={keyUpEventHandler}
      onFocus={focusEventHandler}
      onBlur={blurEventHandler}
      resize='none'
      rows='1'
      overflowY='hidden'
    />
  )
}

export default MessageInput
