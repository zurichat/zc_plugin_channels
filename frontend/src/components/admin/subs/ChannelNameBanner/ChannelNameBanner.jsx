import { Avatar, AvatarGroup, Box, Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { FiHash } from 'react-icons/fi';
import { RiUserAddLine } from 'react-icons/ri';

const  ChannelNameBanner = ({ channelName='Announcement' }) => {
    const userProfiles = useMemo(() => [
        {
            id: 1,
            avatar: 'https://i.pinimg.com/564x/db/e7/e7/dbe7e7ac20192ae081f14bee611c7823.jpg',
            userName: 'nwanoch'
        },
        {
            id: 2,
            avatar: 'https://th.bing.com/th/id/OIP.2wH1-42ccOLKlHIsH7HAOAHaLH?pid=ImgDet&w=84&h=84&c=7',
            userName: 'mark'
        },
        {
            id: 3,
            avatar: 'https://i.pinimg.com/564x/98/98/fa/9898fa74cb0a180b4828907836f454c7.jpg',
            userName: 'Nara'
        },
        {
            id: 4,
            avatar: 'https://i.pinimg.com/564x/98/98/fa/9898fa74cb0a180b4828907836f454c7.jpg',
            userName: 'Nara'
        },
        {
            id: 4,
            avatar: 'https://i.pinimg.com/564x/98/98/fa/9898fa74cb0a180b4828907836f454c7.jpg',
            userName: 'Nara'
        }
    ], [])

    return (
        <Box bg='white' w='95%' paddingInline='10px' paddingBlock='14px' color='black' ml='8' borderRadius='2px'>
            <Flex alignItems='center'>
                <FiHash />
                <Text as='h5' size='sm' fontWeight='semibold' ml='7px' mr='8px'>{ channelName }</Text>
                <BiChevronDown />
                <Spacer />
                <Stack direction='row' spacing='7px' alignItems='center' paddingInline='10px' paddingBlock='3px'>
                    <AvatarGroup size='sm' max={3}>
                        {
                            userProfiles.map((profile, i) => (
                                <Avatar key={`user-profile-${profile.id}`} name={profile.userName} src={profile.avatar} iconLabel={profile.userName} />
                            ))
                        }
                    </AvatarGroup>
                    {/* <Text as='h5' size='sm' fontWeight='normal' color='#2B2B2B' cursor='pointer'>{ userProfiles.length !== 0 ? userProfiles.length: '' }</Text> */}
                    <RiUserAddLine size='20px' color='#2B2B2B' cursor='pointer' />
                </Stack>
            </Flex>
      </Box>
    )
}

export default ChannelNameBanner;