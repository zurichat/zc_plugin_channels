import React from 'react'
import { FaPaperclip, FaGoogleDrive, FaTv, FaRegPaperPlane } from 'react-icons/fa'
import {
    Modal, ModalOverlay, ModalContent, ModalBody,
    Flex, Box, Image, Heading, Stack, StackDivider,
    Divider, HStack, Text, Link,
    List, ListItem, ListIcon, OrderedList, UnorderedList
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/hooks"
import { IconButton } from "@chakra-ui/react";


const MultimediaSharingModal = () =>  {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton tabIndex={-1} aria-label="Search database" icon={<FaPaperclip />} variant="ghost"
                color='grey' colorScheme='green' fontSize='20px' onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} pb={0}>
                <ModalOverlay />
                <ModalContent maxW='24rem' borderWidth={1} borderColor='#dbdbdb' borderStyle='solid'>
                    <ModalBody>
                        <Flex direction="column" pb={2}>
                            <Stack direction="column">
                                <Box pt={2} pb={2}>
                                    <Heading as='h3' size='lg' color='#8b8b8b' fontSize='1.4rem' textAlign='left'>
                                        Your recent files
                                    </Heading>
                                </Box>
                                <FileList />
                            </Stack>
                            <Text pt={3} fontSize='small'>
                                <Link fontWeight='semibold' color="green.300" href="#">
                                    View all your files
                                </Link>
                            </Text>
                            <Divider orientation="horizontal" pt={4} />
                            <Stack direction='column'>
                                <Box pt={4} pb={2}>
                                    <Heading as='h3' size='lg' color='#8b8b8b' fontSize='1.4rem' textAlign='left'>
                                        Add files from
                                    </Heading>
                                </Box>
                                <HStack color='#c4c4c4' spacing={4}>
                                    <FaGoogleDrive size='1.4rem' />
                                    <Link _hover={{ textDecoration: 'none' }}>
                                        <Text fontSize='md' fontWeight='normal'>Google drive</Text>
                                    </Link>
                                </HStack>
                                <HStack color='#c4c4c4' spacing={4}>
                                    <FaTv size='1.4rem' />
                                    <Link _hover={{ textDecoration: 'none' }}>
                                        <Text fontSize='md' fontWeight='normal'>Upload from your computer</Text>
                                    </Link>
                                </HStack>
                            </Stack>
                        </Flex>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MultimediaSharingModal;

const FileList = () =>{
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
                {fileInfo.map((file) => {
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
                    <Text fontSize="small" fontWeight='semibold' color='#565656'>
                        {props.fileName}
                    </Text>
                </Link>
                <HStack>
                    <Link _hover={{ textDecoration: 'none' }}>
                        <Text fontSize="x-small" fontWeight='semibold'>
                            {props.fileAuthor}
                        </Text>
                    </Link>
                    <Text fontSize='x-small'>
                        {props.fileUploadDate} at {props.fileUploadTime}
                    </Text>
                </HStack>
            </Stack>
        </HStack>
    )
}



