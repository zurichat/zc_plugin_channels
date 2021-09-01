import React, { useEffect } from 'react'
import { Box, Text } from '@chakra-ui/layout'
import appActions from '../../redux/actions/app'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import MessageInput from '../message'

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
    <Box width='100%' height='100vh' bg='neutral.100' position='relative'>
      {/* The Message Input */}
      <MessageInput />
    </Box>
  )
}

export default Home
