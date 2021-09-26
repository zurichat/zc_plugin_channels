import React, { useState } from "react";
import { Grid, Flex, Image, Text, Box, Link, Spacer } from "@chakra-ui/react";
import { FormControl, Select, SimpleGrid } from "@chakra-ui/react";
import { FiDownloadCloud, FiMoreVertical } from "react-icons/fi";
import { AiOutlineUpload } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { CgList } from "react-icons/cg";
import { IconButton } from "@chakra-ui/react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import appActions from "../../redux/actions/app";
import { useSelector } from "react";
import axios from "axios";
import fileDownload from "js-file-download";

export default function DisplayAndDeleteFiles() {
  // STEP FIVE (Extract redux function)
  const dispatch = useDispatch();
  const { _getFiles } = bindActionCreators(appActions, dispatch);

  // STEP EIGHT (Extract redux state)
  const { channelsFiles } = useSelector((state) => state.appReducer);
  console.log(channelsFiles);
  const sampleChannelFiles = [
    {
      fileSrc: "https://bit.ly/dan-abramov",
      fileName: "image.png",
      fileDesc: "Lorep, ipsum",
    },
    {
      fileSrc: "https://bit.ly/dan-abramov",
      fileName: "image-two.png",
      fileDesc: "Lorep, ipsum",
    },
    {
      fileSrc: "https://bit.ly/dan-abramov",
      fileName: "image-three.png",
      fileDesc: "Lorep, ipsum",
    },
    {
      fileSrc: "https://bit.ly/dan-abramov",
      fileName: "image-four.png",
      fileDesc: "Lorep, ipsum",
    },
  ];

  const org_id = 1; //Test value for org id
  const channel_id = "613f70bd6173056af01b4aba"; // Hardcoded value to for channel_id

  // STEP SIX
  const loadData = async () => {
    await _getFiles(org_id, channel_id);
  };

  // STEP SEVEN
  useEffect(() => {
    loadData();
  }, []);

  const [isListView, setIsListView] = useState(true);
  const handleGrid = () => {
    setIsListView(false);
  };

  const handleList = () => {
    setIsListView(true);
  };

  return (
    <>
      <Box bg="#e5e5e5" h="100%">
        <Box>
          <Box ml={3} p={3}>
            <Flex>
              <FormControl w="200px" bg="white" border="1px" borderRadius="5px">
                <Select placeholder="Shared by">
                  <option>Me</option>
                  <option>You</option>
                </Select>
              </FormControl>
              <Spacer />
              <Box display="column" w="60px" mr="40px">
                <Flex>
                  <IconButton onClick={handleList}
                    icon={<CgList color="#a1a1a1" />}
                  />
                  {/* <CgList color='#a1a1a1' /> */}
                  {/* <Spacer /> */}
                  {/* <BsGrid color='#a1a1a1' /> */}
                  <IconButton onClick={handleGrid}
                    icon={<BsGrid color="#a1a1a1" />}
                  />
                </Flex>
              </Box>
            </Flex>
          </Box>

          <Flex m="10px">
            <Box>
              <Text>4 results</Text>
            </Box>
            <Spacer />
            <Box>
              <Text> Sort: Newest files</Text>
            </Box>
          </Flex>
          {isListView ? (
            <Grid>
              {sampleChannelFiles.map((item, index) => (
                <Box
                  key={`${item.fileName} ${index}`}
                  w="99%"
                  bg="white"
                  borderRadius="3px"
                  m={2}
                  _hover={{ border: "2px", borderColor: "green.300" }}
                  role="group"
                >
                  <Flex align="center">
                    <Box>
                      <Image
                        m={3}
                        boxSize="70px"
                        objectFit="cover"
                        src={item.fileSrc}
                        alt={item.fileName}
                      />
                    </Box>
                    <Box flexGrow="1">
                      <Text color="#333" fontSize="20px">
                        {item.fileName}
                      </Text>
                      <Text color="#717171" fontSize="12px">
                        {item.fileDesc}
                      </Text>
                    </Box>
                    <Box
                      opacity="0"
                      transition="all .3s"
                      m="10px"
                      border="1px solid #EBEBEB"
                      borderRadius="3px"
                      padding="4px"
                      _groupHover={{ opacity: "1" }}
                    >
                      <Flex alignItems="center">
                        <Link
                          href={item.fileSrc}
                          target="_blank"
                          download={item.fileName}
                        >
                          <IconButton bg="none" _hover={{ bg: '#F0FDF9' }} icon={<FiDownloadCloud />} />
                        </Link>
                        <Box>
                          <IconButton bg="none" _hover={{ bg: '#F0FDF9' }} icon={<AiOutlineUpload />} />
                        </Box>
                        <Box>
                          <IconButton bg="none" _hover={{ bg: '#F0FDF9' }} icon={<FiMoreVertical />} />
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Grid>
          ) : (
            <SimpleGrid columns={[1, 2, 3, 4]} gap="2px">
              {sampleChannelFiles.map((item, index) => (
                <Box
                  key={`${item.fileName} ${index}`}
                  w="90%"
                  bg="white"
                  borderRadius="3px"
                  m={2}
                  _hover={{ border: "2px", borderColor: "blue.300" }}
                  role="group"
                  pos="relative"
                >
                  <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image src={item.fileSrc} alt={item.fileSrc} />
                  </Box>
                  <Box p="6">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {item.fileName}
                    </Box>
                    <Box color="#717171">{item.fileDesc}</Box>
                  </Box>
                  <Spacer />
                  <Box
                    pos="absolute"
                    top="4px"
                    right="4px"
                    opacity="0"
                    transition="all .3s"
                    m="10px"
                    border="1px solid #EBEBEB"
                    borderRadius="3px"
                    padding="4px"
                    bgColor="#ffffff"
                    _groupHover={{ opacity: "1" }}
                  >
                    <Flex alignItems="center">
                      <Link
                        href={item.fileSrc}
                        target="_blank"
                        download={item.fileName}
                      >
                        <IconButton bg="none" _hover={{ bg: '#F0FDF9' }} icon={<FiDownloadCloud />} />
                      </Link>
                      <Box>
                        <IconButton bg="none" _hover={{ bg: '#F0FDF9' }} icon={<AiOutlineUpload />} />
                      </Box>
                      <Box>
                        <IconButton bg="none" _hover={{ bg: '#F0FDF9' }} icon={<FiMoreVertical />} />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>
    </>
  );
}

// import DisplayFile from './DisplayFile'

// export default function  DisplayAndDeleteFiles() {

// return (
//     <>
//         <DisplayFile />
//   </>
// )
// }