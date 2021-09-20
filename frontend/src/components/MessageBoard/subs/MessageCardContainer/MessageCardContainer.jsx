import React, {useEffect, useState} from 'react'
import { Box, Text, Flex} from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FaCaretDown } from "react-icons/fa";

//redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from '../../../../redux/actions/app';

// import MessageCard from "../MessageCard/MessageCard";
import MessageCard from '../../../shared/MessageCard';

const messages = [
    {name: "Dan Abrahmov", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus. xz ,nxc,mx c,mx c,mx c,m x,cm x,m ,mx c,mx c,mx  ,mznmxz bx,c x,cjkkjsc sjcxbn jxbnc kjxbc kjsxbc jkazb xçln lznm≈c zn∫≈ ckjzbdclkjn jzk cjz c bzkjbc zkjbçj sjhcdcbkxb kxb.", icon: "https://bit.ly/dan-abramov" ,index: 1, isThread: false},
    {name: "Deyrin Cutting", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/code-beast" , index: 1, isThread: true},
    {name: "Kelvin monument", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/ryan-florence" , index: 1, isThread: true},
    {name: "Dan Abrahmov", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/dan-abramov" , index: 1, isThread: false},
    {name: "Dan Abrahmov", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/dan-abramov" , index: 1, isThread: false},
    {name: "Dan Abrahmov", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/dan-abramov" , index: 1, isThread: false},
    {name: "Dan Abrahmov", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/dan-abramov" , index: 1, isThread: true},
    {name: "Dan Abrahmov", time: "10:10pm",  message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit placerat tincidunt arcucursus.", icon: "https://bit.ly/dan-abramov" , index: 1, isThread: false},
]

const MessageCardContainer = () =>{

const dispatch = useDispatch()
  const { _getChannelMessages } = bindActionCreators(appActions, dispatch)

  const { channelMessages } = useSelector((state) => state.appReducer)
  console.log(channelMessages);


  const loadData = async () => {
    await _getChannelMessages(1, "613f70bd6173056af01b4aba")
  }

  let messageNumber = 50

  // let loadedMessages = channelMessages.splice(0, messageNumber)
  const [loadedMessagesArray, setLoadedMessages] = useState([])
  const [loaded, setLoaded] = useState(false)

  let loadedMessages = channelMessages.map((message, key) => {return key <= messageNumber})

  useEffect(async () => {
  loadData()
  }, []);
  
  const loadMore = () =>{
    if(channelMessages.lenght === 0){
      messageNumber += 16
    }
    // loadedMessages = channelMessages.splice(0, messageNumber)
    console.log("loading " + loadedMessages, loadedMessages.length, "message limit= " + messageNumber, loadedMessagesArray);
    }

    // let renderedArray = loadedMessages
    console.log(loadedMessages);
    useEffect(()=>{
      setLoaded(true)
    }, [loadedMessages])

    return(
        <Box>
            <Flex borderRadius="15px" p="4px 6px" flexDir="row" justifyContent="center" alignItems="center" gridGap="4px">
            <Button
        background='#FFFFFF'
        border='1px solid rgba(87, 87, 87, 0.3)'
        borderRadius='15px'
        size='xs'
        mb='10px'
        rightIcon={<FaCaretDown />}
      >
        Today
      </Button>
            </Flex>
            
            <Box>
            {
                loadedMessages.map((message) => {
                    return(
                    <MessageCard {...message} key={message._id} />
                    )
                })
            }
            {
              channelMessages.lenght !== 0 ? 
              <Text color="#1264A3" textAlign="center" cursor="pointer" onClick={loadMore}>{loaded? "Load more..." : "Loading..."}</Text> :
              null 
            }
            </Box>
        </Box>    
    )
}

export default MessageCardContainer;
