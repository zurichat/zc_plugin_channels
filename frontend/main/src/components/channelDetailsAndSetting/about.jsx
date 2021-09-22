import React, { useState } from "react";
import { Stack, StackDivider, List, ListItem, Heading, Box, Text} from '@chakra-ui/react';
import LeaveChannel from './LeaveChannel';

const About = () => {

  const name = "Fikun";
  const channelCreationDate = "August 28, 2021";


  const infos = [
    {
      id: 1,
      title: 'Topic',
      placeholder: 'Add a topic'
    },
    {
      id: 2,
      title: 'Description',
      placeholder: 'Add a channel description'
    },
    {
      id: 3,
      title: 'Created by',
      placeholder: `${name} on ${channelCreationDate}`
    },
  ];


  const [info, setInfo] = useState(infos);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [modalValue, setModalValue] = useState({})
  const [isOpen, setIsOpen] = useState(false);
  // const aboutInfo = [];
  function clickHandler(topic, description) {
    setIsOpen(true)
    setModalValue(topic, description)
    console.log(topic, description)
  }

  return (


    <List >
      <Stack
        direction='column'
        m="1.2rem 3.1rem"
        py={3}
        bg="white.700"
        border="1px"
        borderColor="gray.200"
        borderRadius="3px"
        divider={<StackDivider borderColor="gray.200" />}
      >
        {infos.map((info) => {
          return (

            <ListItem key={info.id} info={info}>
              <>
                <Box
                  px='1rem'
                  py='0.2rem'
                  color="black.800"
                >
                  <Heading
                    mb=".32rem"
                    fontWeight="bold"
                    fontSize='sm'
                    color="black.300"
                  >
                    {info.title}
                  </Heading>
                  <Text
                    fontSize="sm"
                    height="auto"
                    onClick={() => clickHandler(topic, description)}
                  >{info.placeholder}
                  </Text>
                </Box>
              </>
            </ListItem>

          )
        })}
        {/* <Text>
                    
                </Text> */}

        <Box
          px='1rem'
          py='0.2rem'
          pt={2} >

          {/* <Link
            href='/'
            // as={ReachLink}
            // to="/home"
            color="#f44336"
            _hover={{ textDecoration: 'none' }}
            fontWeight="600"
            fontSize='sm'>
            Leave Channel Now
          </Link> */}
          <LeaveChannel />
        </Box>
      </Stack>
    </List >



  );
}


export default About;