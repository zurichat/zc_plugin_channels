import React, { useEffect } from 'react'
// import { Box, Text } from '@chakra-ui/layout'
import appActions from '../../redux/actions/app'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Text, Flex, Divider} from '@chakra-ui/layout'


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

//   return (
//     <Box width='100%' height='100vh' bg='gray.500'>
//       <Box
//         position='absolute'
//         top='50%'
//         left='50%'
//         transform='translate(-50%, -50%)'
//         textAlign='center'
//       >
//         <Text fontSize='6xl' color='white'>
//           Update on Team Coelho
//         </Text>

//         <Text color='white' fontSize='2xl'>Zuri Chat Channels Plugin update</Text>
//       </Box>
//     </Box>
//   )
// }

// export default Home

return (
  <Box position='absolute' px={8} pt='3' rounded="sm" width='510px' height='343px' left='50px' top='473px' backgroundColor='#FFFFFF' border='1px solid #EBEBEB'>
      <Flex flexDirection='column'>
          <Text fontWeight="bold" fontSize="12px" color='#333333' mb='2'>Files</Text>
          <Flex flexDirection="row" mb='2'>
              {/* <Box boxSize="sm"> */}
              {/* <Image borderRadius="full" boxSize="150px"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/> */}
                  <img borderRadius="full"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/>
              {/* </Box> */}
              <Flex flexDirection='column' ml='6' >
                  <Text fontWeight='bold' fontSize='12px' color='#333333'>Image.png</Text>
                  <Flex flexDirection='row' alignItems='center' justifyContent='center'>
                      <Text fontSize='8px' mr='8px' fontWeight='bold' color='#717171'>Kevin</Text>
                      <Text fontSize='8px' color='#717171'>Aug 25th at 6.30AM</Text>
                  </Flex>
              </Flex>
          </Flex>
      <Divider orientation="horizontal" />


          <Flex flexDirection="row" my='3'>
              {/* <Box boxSize="sm"> */}
              {/* <Image borderRadius="full" boxSize="150px"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/> */}
                  <img borderRadius="full"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/>
              {/* </Box> */}
              <Flex flexDirection='column' ml='6' >
                  <Text fontWeight='bold' fontSize='12px' color='#333333'>Image.png</Text>
                  <Flex flexDirection='row' alignItems='center' justifyContent='center'>
                      <Text fontSize='8px' mr='8px' fontWeight='bold' color='#717171'>Kevin</Text>
                      <Text fontSize='8px' color='#717171'>Aug 25th at 6.30AM</Text>
                  </Flex>
              </Flex>
          </Flex>
      <Divider orientation="horizontal" />


          <Flex flexDirection="row" my='3'>
              {/* <Box boxSize="sm"> */}
              {/* <Image borderRadius="full" boxSize="150px"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/> */}
                  <img borderRadius="full"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/>
              {/* </Box> */}
              <Flex flexDirection='column' ml='6' >
                  <Text fontWeight='bold' fontSize='12px' color='#333333'>Image.png</Text>
                  <Flex flexDirection='row' alignItems='center' justifyContent='center'>
                      <Text fontSize='8px' mr='8px' fontWeight='bold' color='#717171'>Kevin</Text>
                      <Text fontSize='8px' color='#717171'>Aug 25th at 6.30AM</Text>
                  </Flex>
              </Flex>
          </Flex>
      <Divider orientation="horizontal" />

      <Flex flexDirection="row" my='3'>
              {/* <Box boxSize="sm"> */}
              {/* <Image borderRadius="full" boxSize="150px"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/> */}
                  <img borderRadius="full"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/>
              {/* </Box> */}
              <Flex flexDirection='column' ml='6' >
                  <Text fontWeight='bold' fontSize='12px' color='#333333'>Image.png</Text>
                  <Flex flexDirection='row' alignItems='center' justifyContent='center'>
                      <Text fontSize='8px' mr='8px' fontWeight='bold' color='#717171'>Kevin</Text>
                      <Text fontSize='8px' color='#717171'>Aug 25th at 6.30AM</Text>
                  </Flex>
              </Flex>
          </Flex>
      <Divider orientation="horizontal" />

      <Flex flexDirection="row" my='2'>
              {/* <Box boxSize="sm"> */}
              {/* <Image borderRadius="full" boxSize="150px"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/> */}
                  <img borderRadius="full"  width='36px' height='36px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo"/>
              {/* </Box> */}
              <Flex flexDirection='column' ml='6' >
                  <Text fontWeight='bold' fontSize='12px' color='#333333'>Image.png</Text>
                  <Flex flexDirection='row' alignItems='center' justifyContent='center'>
                      <Text fontSize='8px' mr='8px' fontWeight='bold' color='#717171'>Kevin</Text>
                      <Text fontSize='8px' color='#717171'>Aug 25th at 6.30AM</Text>
                  </Flex>
              </Flex>
          </Flex>
      <Text fontSize='12px' fontWeight="bold" color='#00AD75' as="a" href="" >Show more</Text>
      </Flex>

  </Box>
  

)

}
export default Home



