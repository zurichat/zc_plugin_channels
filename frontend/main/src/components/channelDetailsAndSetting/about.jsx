import React, { useState, useEffect } from "react";
import { Stack, StackDivider, List, ListItem, Heading, Box, Text } from '@chakra-ui/react';
import LeaveChannel from './LeaveChannel';
import axios from 'axios';

const About = (index) => {

  const [topic, setTopic] = useState("Add topic");
  const [description, setDescription] = useState("Add description");
  const [owner, setOwner] = useState("Fikun");
  const [created_on, setCreatedOn] = useState("August 28, 2021");

  const [modalValue, setModalValue] = useState({})
  const [isOpen, setIsOpen] = useState(false);

  const base_url = 'https://channels.zuri.chat';
  const org_id = '1';
  const channel_id = '614fd30bcf2c0f1ad758538e'
  const api_url = `${base_url}/api/v1/${org_id}/channels/${channel_id}/`;

  //Topic
  useEffect(() => {
    const getTopic = async () => {
      const topicFromServer = await fetchTopic();
      setTopic(topicFromServer);
    }
    getTopic();
  }, [])


  const fetchTopic = async () => {
    const res = await axios(api_url).catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data.name);
    return data.topic;
  }

  // Descriptionu
  useEffect(() => {
    const getDescription = async () => {
      const descriptionFromServer = await fetchDescription();
      setDescription(descriptionFromServer);
    }
    getDescription();
  }, [])

  const fetchDescription = async () => {
    const res = await axios(api_url).catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data.description);
    return data.description;
  }

  // channel owner
  useEffect(() => {
    const getOwner = async () => {
      const ownerFromServer = await fetchOwner();
      setOwner(ownerFromServer);
    }
    getOwner();
  }, [])

  const fetchOwner = async () => {
    const res = await axios(api_url).catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data.owner);
    return data.owner;
  }

  // channel creation date
  useEffect(() => {
    const getCreatedOn = async () => {
      const creationDateFromServer = await fetchCreatedOn();
      setCreatedOn(creationDateFromServer);
    }
    getCreatedOn();
  }, [])

  const fetchCreatedOn = async () => {
    const res = await axios(api_url).catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data.created_on);
    return data.created_on;
  }

  //Edit description
  function clickHandler(name, description) {
    setIsOpen(true)
    setModalValue(name, description)
    console.log(name, description)
  }

  return (

    <List>
      <Stack
        direction='column'
        my='1.2rem'
        // m="1.2rem 3.1rem"
        py={3}
        bg="whiteAlpha.700"
        border="1px"
        borderColor="gray.200"
        borderRadius="3px"
        divider={<StackDivider borderColor="gray.200" />}
      >

        <Info key={index} title='Topic' placeholder={topic} clickHandler={clickHandler} />
        <Info key={index} title='Description' placeholder={description} clickHandler={clickHandler} />
        <Info key={index} title='Created by' placeholder={`${owner} on ${created_on}`} clickHandler={clickHandler} />


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
    </List>



  );
}

const Info = ({ title, placeholder, clickHandler }) => {
  return (
    <ListItem key=''>
      <>
        <Box
          px='1rem'
          py='0.2rem'
          color="blackAlpha.800"
          onClick={clickHandler}
        >
          <Heading
            mb=".32rem"
            fontWeight="bold"
            fontSize='sm'
          >
            {title}
          </Heading>
          <Text
            fontSize="sm"
            fontWeight='light'
            height="auto"
            onClick={() => clickHandler(
              //data params
            )}
          >{placeholder}
          </Text>
        </Box>
      </>
    </ListItem>

  )
}

export default About;