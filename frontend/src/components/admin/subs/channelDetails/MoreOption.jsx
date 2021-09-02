import { IconButton } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'

const MoreOption = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<BsThreeDots color='#333333' />}
        rounded='full'
        mb='5px'
        _hover={{ bgColor: '#00B87C', color: 'white' }}
      />
      <MenuList>
        <MenuItem>Notification settings</MenuItem>
        <MenuItem>Huddle settings</MenuItem>
        <MenuItem>Additional options</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MoreOption
