import React, {useEffect, useState} from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  Text,
  Icon,
  Input,
} from "@chakra-ui/react";
import { FaHashtag } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import { Box, Flex, HStack} from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import { useParams } from "react-router";
import avatar from '../../assets/Ellipse-12.png'
import { Avatar } from "@chakra-ui/avatar";
import {AiOutlineClose} from "react-icons/ai"

const SelectUser = ({user}) => (
  <HStack>
    <Avatar src={avatar}></Avatar>
    <Text>{user}</Text>
    <Icon as={AiOutlineClose}></Icon>
  </HStack>
)

const AddPeopleModal = ({ isOpen, onClose }) => {

  const [users, setUsers] = useState([])
  const [value, setValue] = useState('') 
  const [show, setShow] = useState(false)
  const handleChange = (e) => setValue(e.target.value)

  const handleKeyDown = (e) => {
    console.log(e.key)
    if (e.key === 'Enter' || e.key === ' ') {
      setUsers([...users, value])
      setValue("")
   } 
  }



  const handleClose = () => setShow(false);

  const handleCloseModal = () => {
    addUser();
    handleClose();
  }
 
  const { channelId } = useParams()//dynamic channel id
  const org_id = '614679ee1a5607b13c00bcb7';//Test value for org id
  const channel_id = channelId; //assigning dynamic channel id to channel_id
  const dispatch = useDispatch();
  // channel members
  const { _addChannelMember, _getChannelDetails} = bindActionCreators(appActions, dispatch);//extract redux function
  const { channelMember } = useSelector((state) => state.channelsReducer);//extract redux state
  console.log(channelMember);//to see what kind of data I'm actually getting
  //channel details
  const { channelDetails } = useSelector((state) => state.channelsReducer);//extract redux state
  const loadChannelDetails = async () => { await _getChannelDetails(org_id, channel_id);};
  useEffect(() => { loadChannelDetails(); }, []);

  const addUser = () => {
    const data = {
    _id: users[0], 
    role_id: "member",  
    is_admin: false,  
    notifications: {   
      web: "nothing",    
      mobile: "mentions",    
      same_for_mobile: true,
      mute: false }
    }
    _addChannelMember(org_id, channel_id, data)
    console.log(data) 
  }
  const isPrivate = channelDetails.private;// to check if channel is private or not


  return (
    <Modal onClose={onClose} isOpen={isOpen} show = {show} onHide = {handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box>
            Add People
            <Text fontSize="14px" color="#8B8B8B">
            {isPrivate === true ? <Icon as={BiLockAlt} marginRight="3px" />:<Icon as={FaHashtag} marginRight="3px" /> }
              {channelDetails.name}
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
        <Flex flexWrap='wrap'>
          {users.map((user, index) => <SelectUser user={user} key={index} />)}
          <Input flex={1}
            placeholder="Enter a name, email or user group"
            borderRadius="sm"
            color="#8B8B8B"
            size="lg"
            focusBorderColor="green.200"
            onKeyDown = {handleKeyDown}
            onChange={handleChange}
            value={value}
            minWidth="50px"/>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="whatsapp"
            mb="4"
            borderRadius="3px"
            onClick={handleCloseModal}
            px="2rem"
            py="1rem"
            _focus={{outline: "none"}}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};



export default AddPeopleModal;