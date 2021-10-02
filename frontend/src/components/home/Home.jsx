import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/layout'
import appActions from '../../redux/actions/app'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { Heading } from '@chakra-ui/react'
import { BiChevronDown } from 'react-icons/bi'
import { Flex, Spacer } from '@chakra-ui/react'
import CreateChannelModal from '../createChannel/createChannelModal'

const Home = () => {
  // STEP FIVE (Extract redux function)
  const dispatch = useDispatch()
  const { _getUsers } = bindActionCreators(appActions, dispatch)

  // STEP EIGHT (Extract redux state)
  const { users } = useSelector(state => state.appReducer)
  console.log(users)

  // STEP SIX
  const loadData = async () => {
    await _getUsers()
  }

  // STEP SEVEN
  useEffect(() => {
    loadData()
  }, [])

  return (
    <Box width='100%' height='100vh' bg='#E5E5E5' pt={4}>
      <Box bg='white' w='95%' p={4} color='black' ml='8' borderRadius='2px'>
        <Flex cursor='pointer' alignItems='center'>
          <Heading as='h5' size='sm' fontWeight='semibold'>
            # New Channel
          </Heading>
          <BiChevronDown />
          <Spacer />
          <CreateChannelModal />
        </Flex>
      </Box>
    </Box>
  )
}

export default Home
