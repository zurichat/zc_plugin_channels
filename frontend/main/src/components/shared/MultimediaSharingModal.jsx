import React from 'react'
import { FaGoogleDrive, FaTv } from 'react-icons/fa'
import {
    Modal, ModalOverlay, ModalContent,
    Flex, Box, Image, Heading, Stack,
    Divider, HStack, Text, Link,
    List, ListItem
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/hooks"
import { FiPaperclip } from 'react-icons/fi';

const MultimediaSharingModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <FiPaperclip
                variant="ghost"

                _focus='none'
                fontSize='20px' size={20}
                onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} size='xs' isCentered='true' pb={0}>
                <ModalOverlay />
                <ModalContent
                    bottom='-5.6rem' left='3.6rem'
                    maxW='20rem'
                >

                    <Flex direction="column">
                        <Stack direction="column" p={4} pb={0}>
                            <Box pt={2} pb={2}>
                                <Heading
                                    as='h3'
                                    size='md'
                                    color='#8b8b8b'
                                    fontSize='1.2rem'
                                    textAlign='left'>
                                    Your recent files
                                </Heading>
                            </Box>
                            <FileList />
                            <Text
                                pt={3}
                                fontSize='xs'>
                                <Link
                                    fontWeight='semibold' _focus='none' color="green.300" href="#">
                                    View all your files
                                </Link>
                            </Text>
                        </Stack>

                        <Divider
                            orientation="horizontal"
                            pt={4} />
                        <Stack
                            direction='column'
                            p={4} pt={0}>
                            <Box pt={4} pb={2}>
                                <Heading as='h3' size='md' color='#8b8b8b' fontSize='1.2rem' textAlign='left'>
                                    Add files from
                                </Heading>
                            </Box>
                            {/* <HStack color='#c4c4c4' spacing={4}>
                                <FaGoogleDrive size='1.2rem' />
                                <Link _hover={{ textDecoration: 'none' }}>
                                    <Text fontSize='sm' fontWeight='normal'>Google drive</Text>
                                </Link>
                            </HStack> */}
                            <HStack color='#c4c4c4' spacing={4}>
                                <FaTv size='1.2rem' />
                                <Link _hover={{ textDecoration: 'none' }}>
                                    <Text fontSize='sm' fontWeight='normal'>Upload from your computer</Text>
                                </Link>
                            </HStack>
                        </Stack>
                    </Flex>


                </ModalContent>
            </Modal>
        </>
    )
}

export default MultimediaSharingModal;

const FileList = () => {
    const fileInfo = [
        {
            imageUrl: 'https://bit.ly/sage-adebayo',
            name: 'image.png',
            author: 'Kevin',
            uploadDate: 'Aug 25th',
            uploadTime: '6:30 AM'
        },
        {
            imageUrl: 'https://bit.ly/sage-adebayo',
            name: 'image.png',
            author: 'Kevin',
            uploadDate: 'Aug 25th',
            uploadTime: '6:30 AM'
        },
        {
            imageUrl: 'https://bit.ly/sage-adebayo',
            name: 'image.png',
            author: 'Kevin',
            uploadDate: 'Aug 25th',
            uploadTime: '6:30 AM'
        }
    ];
    return (
        <Stack>
            <List spacing={4}>
                {fileInfo.slice(0, 2).map((file) => {
                    return (

                        <ListItem>
                            <File
                                snapshotUrl={file.imageUrl}
                                fileName={file.name}
                                fileAuthor={file.author}
                                fileUploadDate={file.uploadDate}
                                fileUploadTime={file.uploadTime}
                            />
                        </ListItem>

                    )
                })}
            </List>
        </Stack>
    )
}

const File = props => {
    // const {snapshotUrl, fileName, fileAuthor, fileUploadDate} = props;
    return (
        <HStack spacing={4}>
            <Image
                boxSize="48px"
                borderRadius={4}
                objectFit="cover"
                src={props.snapshotUrl}
                alt=""
            />
            <Stack spacing={0}>
                <Link _hover={{ textDecoration: 'none' }}>
                    <Text fontSize="xs" fontWeight='semibold' color='#565656'>
                        {props.fileName}
                    </Text>
                </Link>
                <HStack>
                    <Link _hover={{ textDecoration: 'none' }}>
                        <Text fontSize="xx-small" fontWeight='semibold'>
                            {props.fileAuthor}
                        </Text>
                    </Link>
                    <Text fontSize='xx-small'>
                        {props.fileUploadDate} at {props.fileUploadTime}
                    </Text>
                </HStack>
            </Stack>
        </HStack>
    )
}