import React, { useEffect } from 'react'
import { Box, Text } from '@chakra-ui/layout'
import appActions from '../../redux/actions/app'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

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
    <Box width='100%' height='100vh' bg='gray.500'>
      <Box
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        textAlign='center'
      >
        <Text fontSize='6xl' color='white'>
          Update on Team Coelho
        </Text>

        <Text color='white' fontSize='2xl'>Zuri Chat Channels Plugin update</Text>
      </Box>
    </Box>
  )
}

export default Home
