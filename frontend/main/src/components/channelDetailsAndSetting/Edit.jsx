import React from "react"
import { Link, HStack, Text } from "@chakra-ui/react"
import { FiEdit } from 'react-icons/fi';


const Edit = ({ clickHandler }) => {
    return (
      <Link
        _hover={{
          textDecoration: 'none',
          // color: 'gray' 
        }}
        color='#1264A3'
        onClick={() => clickHandler(
          //data params
        )}
      >
  
        <HStack>
          <FiEdit mx={2} size={16} />
          <Text
            pt='2px'
            fontFamily='Roboto, sans-serif'
            fontSize={14}>Edit</Text>
        </HStack>
      </Link>
    )
  
  }

  export default Edit;