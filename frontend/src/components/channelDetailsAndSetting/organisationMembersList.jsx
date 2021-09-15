import { Box } from "@chakra-ui/layout";
import {
  IconButton,
  Text,
  Stack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import {BsPersonPlus}  from "react-icons/bs";
import googleImage from "../channelDetailsAndSetting/images/images.png";

const OrganisationMembersList = () => {

      const MembersList =  [
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' },
            {FirstName: 'Abibola', FullName: 'Ifunanyachi Abibola Oworu-Chima', stack: 'Frontend Dev', src:'./images/images.png' }
      ]

      let MembersElements = MembersList.map( member => { 
            return <Box>
                  {/* members list container */}
                        <Box display='flex'  pos='relative' left='-2.8em'>
                              {/* members list image avatar */}
                              <Image src={googleImage} 
                                    borderRadius='50%' h='35px' w='36px' 
                                    alignItems='flex-start'  alt='' />
                                    {/* members list active/non active indicator */}
                              <Box borderRadius='50%' ml='-.8rem' mt='1.9rem' w='.7em' h='.7em' 
                                    borderColor='white' borderWidth='.141rem' bg='gray'></Box>
                                    {/* display name (first name and full name) */}
                              <Text display='flex' position='relative' color='black' ml='16px' top='-.1rem' mt='.5px' fontSize='1rem' fontWeight='bold'>{member.FirstName} |  
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
    <Box position='absolute'
        left='0'
        top= '12.8em'
        w='430px'
        h='520px'
        alignContent='center'
        backgroundColor='white' 
        color='black'  > 
        {/* input feild */}
        <InputGroup size="md" w='38rem' ml='27px' mt='14px'>
                  <Input _focus='none'  pr="4.5rem"placeholder="Find Member"/>
                  <InputRightElement width="4.5rem" bgColor='none'>
                  <IconButton ml='2rem' background='none' _hover='none' icon={<BiSearch  />} />
                  </InputRightElement>
      </InputGroup>

      {/* add member icon and text */}
      <Stack  mt="1.5rem"
          ml="1.8rem"
          mb='1.8rem'
          pos="relative"
          direction={"row"}
          spacing="18px">
              <IconButton bgColor='#00B87C' borderRadius='50%' _hover='none' color='white' background='white' icon={ <BsPersonPlus  color='white' />} />
                <Text color="black" fontSize='.98rem' pos='relative' left='-.6rem' cursor='pointer' top='.32rem' ml="1px" mt="2rem" mb='0px' fontWeight="bold">
                        Add Members
                  </Text>
      </Stack>

           {/* stack of members list  */}
            <Stack mt='1.5rem' ml='4.5rem' pos='relative'   direction={'column'}  spacing='18px'  >
            <Stack direction={'column'} spacing='0'>
                        {MembersElements}
            </Stack> 
            </Stack>

            </Box>
  
 

  )
}

export default OrganisationMembersList;
