import {Box }  from '@chakra-ui/layout'
import {  IconButton, Text, Stack, Image, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { BiSearch, } from "react-icons/bi"
import { BsPersonPlus } from "react-icons/bs"
import googleImage from "../channelDetailsAndSetting/images/images.png"



const OrganisationMembersList = () => {

      const MembersList =  [
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' }
      ]

      let MembersElements = MembersList.map( member => { 
            return (
            <Box>
                  <Box display='flex'  pos='relative' left='-2.3em'>
                  <Image src={googleImage} 
                          borderRadius='50%' h='30px' w='32px' 
                          alignItems='flex-start'  alt='' />
                  <Box borderRadius='50%' ml='-.8rem' mt='1.5rem' w='.7em' h='.7em' 
                        borderColor='white' borderWidth='.141rem' bg='gray'>
                  </Box>
                <Text display='flex' position='relative' color='black' ml='8px' top='-.1rem' mt='.5px' fontSize='1rem' fontWeight='bold'>{member.FirstName} |  
                <Text color='gray' ml='.3rem' fontWeight='normal' fontSize='1rem'>{member.FullName}</Text></Text>
              </Box>
              <Text left='-2.9em' position='relative' 
                    color='gray' zIndex='2' paddingLeft='40px' top='-.9rem'  margin='0' mt='.1rem'
                    fontWeight='normal' fontSize='.8rem'>{member.stack}
              </Text>
            </Box>
            )
      })
      

 return (

 
    <Box position='absolute'
        left='460'
        top= '8em'
        w='430px'
        h='520px'
        alignContent='center'
        backgroundColor='white' 
        color='blue' > 

    <Stack direction={'column'}  spacing='38px' ml='4rem' mr='4rem'>
        <InputGroup width='380px' top='19px' left='-2em'>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em" />
          <Input placeholder="Find members" paddingLeft='.8rem' _focus='none'   />
          <InputRightElement children={<BiSearch color="gray" fontSize='1.5rem' />} /> 
        </InputGroup>

    <Box pos='relative'  left='-2em' display='flex' >
      <IconButton backgroundColor='#00B87C' 
        size='sm'
        w='21px' 
        borderRadius='50%' 
        icon={<BsPersonPlus color='white'/>} />
    
      <Text color='black' ml='8px' mt='5px'  fontWeight='bold'>Add Members</Text>
    </Box>
  </Stack>

  <Stack mt='1.5rem' ml='4.5rem' pos='relative'   direction={'column'}  spacing='18px'  >
   <Stack direction={'column'} spacing='0'>
             {MembersElements}
    </Stack> 
  </Stack>
 
 </Box>

 )
}

export default OrganisationMembersList;