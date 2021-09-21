import { Box } from "@chakra-ui/layout";
import {
  IconButton,
  Text,
  Stack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import {BsPersonPlus}  from "react-icons/bs";
import googleImage from "../channelDetailsAndSetting/images/images.png";

const OrganisationMembersList = () => {

      const MembersList =  [
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
           
          
      ]

      let MembersElement = MembersList.map( member => { 
            return <Box>
                  {/* members list container */}
                        <Box display='flex'  pos='relative' left='-2.8em'>
                              {/* members list image avatar */}
                              <Image src={googleImage} 
                                    borderRadius='3px' h='29px' w='36px' 
                                    alignItems='flex-start'  alt='' />
                                    {/* members list active/non active indicator */}
                              <Box borderRadius='50%' ml='-.5rem' mt='1.5rem' w='.7em' h='.7em' 
                                    borderColor='white' borderWidth='.141rem' bg='#F2FFFB'></Box>
                                    {/* display name (first name and full name) */}
                              <Text display='flex' position='relative' color='black' ml='16px' top='-.1rem' mt='.5px' fontSize='1rem' fontWeight='bold'>{member.FirstName}   
                              <Text color='gray' ml='.3rem' fontWeight='normal' fontSize='1rem'>{member.FullName}</Text></Text>
                        </Box>
                        {/* members stack */}
                        <Text left='-2.9em' position='relative' 
                              color='gray'  paddingLeft='40px'  top='-.98rem' ml='5.5px' mt='.1rem'
                              fontWeight='normal' fontSize='.8rem'>{member.stack}
                        </Text>
                  </Box>
            
      })


      let ActiveMembersElement = MembersList.map (member => {
            return <Box>
                              {/* members list container */}
                              <Box display='flex'  pos='relative' left='-2.8em'>
                              {/* members list image avatar */}
                              <Image src={googleImage} 
                                    borderRadius='3px' h='29px' w='36px' 
                                    alignItems='flex-start'  alt='' />
                                    {/* members list active/non active indicator */}
                              <Box borderRadius='50%' ml='-.5rem' mt='1.5rem' w='.7em' h='.7em' 
                                    borderColor='white' borderWidth='.141rem' bg='#00B87C'></Box>
                                    {/* display name (first name and full name) */}
                              <Text display='flex' position='relative' color='black' ml='16px' top='-.1rem' mt='.5px' fontSize='1rem' fontWeight='bold'>{member.FirstName}   
                              <Text color='gray' ml='.3rem' fontWeight='normal' fontSize='1rem'>{member.FullName}</Text></Text>
                        </Box>
                        {/* members stack */}
                        <Text left='-2.9em' position='relative' 
                              color='gray'  paddingLeft='40px'  top='-.98rem' ml='5.5px' mt='.1rem'
                              fontWeight='normal' fontSize='.8rem'>{member.stack}
                        </Text>
                  </Box>
      })
      

 return ( 
      //  members list container
    <Box transform='scale(0.9)' position='absolute'
        left='-1rem'
        top= '11rem'
        w='430px'
        h='520px'
        alignContent='center'
        backgroundColor='white' 
        color='black'  > 
        {/* input feild */}
        <InputGroup size="md" w='32rem' ml='27px' mt='14px'>
                  <Input _focus='none' _hover='none'  borderColor='#000000'  pr="4.5rem"  _placeholder={{ color: '#333333' }} placeholder="Find Members"/>
                  <InputLeftElement width="4.5rem" bgColor='none'>
                  <IconButton ml='-2rem' background='none' _hover='none' icon={<BiSearch color='#333333' />} />
                  </InputLeftElement>
      </InputGroup>

      {/* add member icon and text */}
      <Stack  mt="1.5rem"
          ml="1.8rem"
          mb='1.8rem'
          pos="relative"
          direction={"row"}
          spacing="18px">
              <IconButton bgColor='#E1FDF4' transform="scale(1)" borderRadius='4px' _hover='none'  icon={ <BsPersonPlus  color='#00B87C' />} />
                <Text color="black" fontSize='1.2rem' pos='relative' left='-.6rem' cursor='pointer' top='.32rem' ml="1px" mt="2rem" mb='0px' fontWeight="bold">
                        Add People
                  </Text>
      </Stack>

           {/* stack of members list  */}
            <Stack mt='1.5rem' ml='4.5rem' pos='relative'   direction={'column'}  spacing='18px'  >
            <Stack direction={'column'} spacing='0'>
                        {MembersElement}
                        {ActiveMembersElement}
                        {MembersElement}
                        {ActiveMembersElement}
            </Stack> 
            </Stack>

            </Box>
  
 

  )
}

export default OrganisationMembersList;
