import React, { useState } from 'react'
import { Box, Divider, Input, Button } from '@chakra-ui/react'
import { IoFlashOutline, IoSendSharp } from 'react-icons/io5'
import { BsTypeBold, BsLink45Deg } from 'react-icons/bs'
import { FiAtSign, FiItalic } from 'react-icons/fi'
import { AiOutlineBars } from 'react-icons/ai'
import { GrAttachment } from 'react-icons/gr'

function InputFieldComponent() {
  const [input, setInput] = useState(false)
  return (
    <Box p={3}>
      <Box display='flex' flexDirection='column' borderWidth='1px' p={3}>
        <Input
          variant='unstyled'
          placeholder='Send a Message'
          size='lg'
          fontSize='md'
          onInput={() => setInput(true)}
          onMouseOut={() => setInput(false)}
        />
        <Box
          maxW='100%'
          display='flex'
          justifyContent='space-between'
          mt={5}
          flexDirection='row'
          alignItems='center'
        >
          <Box
            width={{ base: '100px', sm: '150px', md: '180px' }}
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            _hover={{ cursor: 'pointer' }}
          >
            <IoFlashOutline />
            <Divider height='20px' color='gray.500' orientation='vertical' />
            <BsTypeBold />
            <FiItalic />
            <BsLink45Deg />
            <AiOutlineBars />
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            width={{ base: '60px', sm: '80px', md: '120px' }}
            _hover={{ cursor: 'pointer' }}
          >
            <FiAtSign />
            <GrAttachment />
            {input ? (
              <Button bg='#00B87C' size='xs'>
                <IoSendSharp color='white' />
              </Button>
            ) : (
              <IoSendSharp />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default InputFieldComponent
