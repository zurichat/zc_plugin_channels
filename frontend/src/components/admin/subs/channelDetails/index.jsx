import React, { useMemo } from 'react'
import { Box, Divider, HStack, Text } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/button'
import { IoMdClose } from 'react-icons/io'
import { Image } from '@chakra-ui/image'
import ChannelImage from '../../../images/channelImg.png'
import {
  FiChevronDown,
  FiChevronRight,
  FiPhone,
  FiSearch,
  FiUserPlus,
} from 'react-icons/fi'
import { AiOutlineUser } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { v4 } from 'uuid'
import Icon from '@chakra-ui/icon'
import MoreOption from './MoreOption'

const ChannelDetails = () => {
  const options = useMemo(
    () => [
      {
        title: 'Add',
        icon: <FiUserPlus color='#333333' />,
        id: v4(),
        onClick: () => {},
      },
      {
        title: 'Find',
        icon: <FiSearch color='#333333' />,
        id: v4(),
        onClick: () => {},
      },
      {
        title: 'Call',
        icon: <FiPhone color='#333333' />,
        id: v4(),
        onClick: () => {},
      },
    ],
    [],
  )

  const moreDetails = useMemo(
    () => [
      {
        id: v4(),
        name: 'Admins',
        count: 1,
        icon: AiOutlineUser,
      },
      {
        id: v4(),
        name: 'Members',
        count: 150,
        icon: AiOutlineUser,
      },
      {
        id: v4(),
        name: 'Messages',
        count: 3576,
        icon: FiChevronRight,
      },
      {
        id: v4(),
        name: 'Pinned Messages',
        count: 25,
        icon: FiChevronRight,
      },
      {
        id: v4(),
        name: 'Files Shared',
        count: 50,
        icon: FiChevronRight,
      },
    ],
    [],
  )

  return (
    <Box borderRadius='md' shadow='md' width='25%'>
      <HStack justifyContent='space-between' px='21px' py='10px'>
        <Box>
          <Text fontWeight='bold'>Details</Text>
          <Text color='#999999'># Announcements</Text>
        </Box>
        <IconButton
          size='sm'
          aria-label='close'
          icon={<IoMdClose />}
          variant='ghost'
        />
      </HStack>
      <Box mb='1.5rem'>
        <Image src={ChannelImage} />
      </Box>
      <HStack
        borderBottomWidth='1px'
        borderColor='gray.100'
        justifyContent='space-between'
        px='2.8rem'
        pb='1rem'
      >
        {options.map(option => (
          <Box key={option.id} textAlign='center'>
            <IconButton
              aria-label={option.title}
              onClick={option.onClick}
              icon={option.icon}
              rounded='full'
              _hover={{ bgColor: '#00B87C', color: 'white' }}
              mb='5px'
            />
            <Text fontSize='xs' fontWeight='bold'>
              {option.title}
            </Text>
          </Box>
        ))}
        <Box>
          <MoreOption />
          <Text fontSize='xs' fontWeight='bold'>
            More
          </Text>
        </Box>
      </HStack>

      <Box px='29px' pt='2rem'>
        <HStack mb='0.5rem' justifyContent='space-between'>
          <Text fontWeight='bold' fontSize='xs'>
            About
          </Text>
          <Icon aria-label='dropdown' as={FiChevronDown} />
        </HStack>
        <Box borderBottomWidth='1px' borderColor='gray.100' py='1rem'>
          <Text color='gray.700' fontSize='1.2rem'>
            Topic
          </Text>
          <Text fontSize='xs' color='gray.500'>
            Announcments
          </Text>
        </Box>
        <Box py='0.5rem'>
          <Text color='gray.700' fontSize='1.2rem'>
            Description
          </Text>
          <Text fontSize='xs' color='gray.500'>
            Any notifications and alerts shall be sent via this platform
          </Text>
        </Box>
      </Box>
      <Box>
        <Divider orientation='horizontal' />
        {moreDetails.map(detail => (
          <>
            <HStack
              py='1rem'
              px='29px'
              key={detail.id}
              justifyContent='space-between'
            >
              <Text fontSize='xs' fontWeight='bold'>
                {detail.name}
              </Text>
              <HStack>
                <Text fontSize='xs'>{detail.count}</Text>
                <Icon aria-label={detail.name} as={detail.icon} />
              </HStack>
            </HStack>
            <Divider orientation='horizontal' />
          </>
        ))}
      </Box>
      <Box py='1rem' px='29px'>
        <Text fontWeight='bold' fontSize='sm' color='gray.400'>
          Channel created Aug 30th 2021
        </Text>
      </Box>
    </Box>
  )
}

export default ChannelDetails
