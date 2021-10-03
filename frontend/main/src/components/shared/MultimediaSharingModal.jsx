import React from 'react'
import { IoSend } from 'react-icons/io5'
import { FaGoogleDrive, FaTv } from 'react-icons/fa'
import {
    Flex, Box, Image, Heading, Stack,
    Divider, HStack, Text, Link, Input,
    List, ListItem, FormLabel,
} from "@chakra-ui/react"
import axios from 'axios'
import { useState } from 'react';


const MultimediaSharingModal = () => {
    const [selectedFile, setselectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const fileSelectHandler = event => {
        const fileSelected = event.target.files[0];
        setselectedFile(fileSelected);
        setIsFilePicked(true);
    }
    const fileUploadHandler = async () => {
        const fd = new FormData();
        fd.append('file', selectedFile);
        axios.post(`https://channels.zuri.chat/api/v1/1/channels/614fd30bcf2c0f1ad758538e/messages/`, fd)
            .then(await axios.get(`https://channels.zuri.chat/api/v1/1/channels/614fd30bcf2c0f1ad758538e/media/?format=json`, fd)
                .then(res => {
                    console.log(res.files)
                    return res.files[id];
                })).catch((error) => {

                    console.error('Error:', error);

                });
    }

    return (
        <Flex direction="column">
            <Stack direction="column" p={4} pb={0}>
                <Box pt={2} pb={2}>
                    <Heading
                        as='h3'
                        size='lg'
                        color='#8b8b8b'
                        fontSize='1.4rem'
                        textAlign='left'>
                        Your recent files
                    </Heading>
                </Box>
                <FileList />
                <Text
                    pt={3}
                    fontSize='small'>
                    <Link
                        fontWeight='semibold'
                        _focus='none'
                        color="green.300"
                        href="#">
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
                    <Heading
                        as='h3'
                        size='lg'
                        color='#8b8b8b'
                        fontSize='1.4rem'
                        textAlign='left'>
                        Add files from
                    </Heading>
                </Box>
                {/* <HStack color='#c4c4c4' spacing={4}>
                                <FaGoogleDrive size='1.2rem' />
                                <Link _hover={{ textDecoration: 'none' }}>
                                    <Text fontSize='sm' fontWeight='normal'>Google drive</Text>
                                </Link>
                            </HStack> */}
                <HStack
                    color='#c4c4c4'
                    spacing={4} >
                    <FaTv size='1.4rem' />

                    <FormLabel for="upload-option-file">
                        <Link _hover={{ textDecoration: 'none' }}>Upload from your computer</Link>
                    </FormLabel>
                    <Input type="file" style={{ display: 'none' }} id="upload-option-file" name="upload-option-file" onClick={fileSelectHandler} />


                </HStack>
                <Stack pt='20px'>
                    {isFilePicked ? (
                        <Box>
                            <Text>Upload Successful. File url: {selectedFile}</Text>
                        </Box>
                    ) : (<Text>Select file</Text>)}
                </Stack>
                {/* <IconButton onClick={fileUploadHandler} maxW={12} icon={<IoSend />} /> */}
            </Stack>
        </Flex>
    )
}



const FileList = () => {

    // Mock data
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

export default MultimediaSharingModal;