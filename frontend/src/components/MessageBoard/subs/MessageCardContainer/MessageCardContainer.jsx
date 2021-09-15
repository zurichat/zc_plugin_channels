import React from 'react'
import { Box, Text, Flex} from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FaCaretDown } from "react-icons/fa";

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
                messages.map((message) => {
                    return(
                    <MessageCard {...message} />
                    )
                })
            }
            </Box>
        </Box>    
    )
}

export default MessageCardContainer;
