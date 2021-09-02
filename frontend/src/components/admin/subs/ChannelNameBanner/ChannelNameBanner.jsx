import { Box, Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react'
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
                <MultiUserProfilePreview userProfiles={userProfiles} />
            </Flex>
      </Box>
    )
}

/**
 * A component to show preview of user avatar with a maximum of three stacks
 * @param {Array} userProfile 
 * @returns React.FC
 */
const MultiUserProfilePreview = ({ userProfiles=[] }) => {
    // Parameters to calculate the size of the component
    const singleProfileSize = 32
    const profileOffset = 14
    // Allow maximum profile avatar preview of 3
    const selectedProfilePreviewCount = Math.min(userProfiles.length, 3)
    const estimatedWidth = userProfiles.length > 1 ? (selectedProfilePreviewCount - 1) * profileOffset + singleProfileSize : 0
    const selectedProfilePreview = userProfiles.filter((_, i) => i < selectedProfilePreviewCount)

    return (
        <Stack direction='row' spacing='7px' alignItems='center' paddingInline='10px' paddingBlock='3px'>
            <Box direction='row' spacing='0' position='relative' width={`${estimatedWidth}px`} height={`${singleProfileSize}px`}>
                {
                    selectedProfilePreview.map((profile, i) => {
                        return (
                            <Image 
                                key={`multi-user-profile-${profile.id}`} 
                                src={profile.avatar}
                                alt={profile.userName}
                                title={profile.userName}
                                objectFit='cover'
                                boxSize='32px'
                                borderRadius='full'
                                border='2px solid white'
                                position='absolute'
                                left={`${i * profileOffset}px`}
                                top='0'
                                cursor='pointer'
                            />
                        )
                    })
                }
            </Box>
            <Text as='h5' size='sm' fontWeight='normal' color='#2B2B2B' cursor='pointer'>{ userProfiles.length !== 0 ? userProfiles.length: '' }</Text>
            <RiUserAddLine size='20px' color='#2B2B2B' cursor='pointer' />
        </Stack>
    )
}

export default ChannelNameBanner;