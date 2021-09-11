import React from 'react'
import {Box, IconButton, Image , Button} from "@chakra-ui/react"
import { FaTimes } from "react-icons/fa";
import {FaRegComment} from "react-icons/fa";
import {FaRegFolder} from "react-icons/fa";
import {FaTwitch} from "react-icons/fa";
// import userimage from '../../assets/Ellipse 12.png'

function OnclickuserProfile() {
    return (
        <Box>
            <Box 
                display="flex" 
                justifyContent="space-between" 
                >
                <Box 
                fontSize="18px" 
                fontWeight="700" 
                pl="14px" 
                pr="10px">Profile
                </Box>
                <IconButton icon={<FaTimes/>} />
            </Box>

            <Box>
                <Image src="https://bit.ly/ryan-florence" alt="My-images"  d="block" ml="auto" mr="auto" mt="40px" />
            </Box>
            <Box mt="40px" fontWeight="700" fontSize="20px" textAlign="center">
                <h5 >Adeeko Emmanuel</h5>
            </Box>
            <Box mt="10px" fontWeight="400" fontSize="12px" textAlign="center">
                <p>@Adeeko246</p>
            </Box>

            <Box  mt="60px" display="flex" justifyContent="center" alignItems="center">
                <IconButton icon={<FaRegComment />} background="E9E9e9" width="54px" height="54px" borderRadius="12px"/>
                <IconButton icon={<FaRegFolder />} background="E9E9e9" width="54px" height="54px" borderRadius="12px" ml="24px"/>
                <IconButton icon={<FaTwitch />} background="#00B87C" width="54px" height="54px" borderRadius="12px" ml="24px"/>
            </Box>
            <Box mt="30px" background="white" border="1px solid #F0F0F0" ml="39px" >
                <p color="#A6A6A6;" fontSize="15px">Role</p>

                <p  mt="10px">UI/UX Designer</p>
            </Box>
            <Box mt="30px" background="white" border="1px solid #F0F0F0" ml="39px" >
                <p color="#A6A6A6;" fontSize="15px">Email</p>
                <p  mt="10px">Adeekoemmanuel@gmail.com</p>
            </Box>
            <Box mt="30px" background="white" border="1px solid #F0F0F0" ml="39px" >
                <p color="#A6A6A6;" fontSize="15px">Mobile Number</p>
                <p  mt="10px">08012345678</p>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Button backgroundColor="#00B87C" variant="link" width="206px" height="56px" mt="56px" color="#FFFFFF;">
                    Other Activities
                </Button>
            </Box>
            
                     
        </Box>
       
       
    )
}

export default OnclickuserProfile;
