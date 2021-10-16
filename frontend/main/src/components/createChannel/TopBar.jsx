import React from "react";
import { Avatar, Spacer, Text, AvatarGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { BiChevronDown, BiChevronLeft } from "react-icons/bi";
import { Box, HStack } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Flex, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const TopBar = () => {
  const {
    channelsReducer: { channelDetails },
  } = useSelector((state) => state);

  return (
    <Box bg="#00B87C" p={4} py={2} borderRadius="2px">
      <HStack alignItems="center">
        <Heading as="h5" size="sm" color="#FFFFFF" textTransform="capitalize">
          # {channelDetails.namez}
        </Heading>

        <Icon as={BiChevronDown} color="#FFFFFF" />

        <Spacer />

        <HStack p="3px" bg="white" borderRadius="md">
          <AvatarGroup size="sm" max={3} borderRadius="base" spacing={-2}>
            <Avatar
              name="Ryan Florence"
              borderRadius="md"
              src="https://s3-alpha-sig.figma.com/img/e681/51b8/15187abf9e80c64eaabed22ad5ad502c?Expires=1632700800&Signature=FJ0lIAiKy7IWyArlymep5w3Xb6Vc7xeSL2L-JH~hp8c8uV~6hqzaKZID0iRTlZoyHHw9Q8nrsDRNCD869uuM1sOJGEX7~L-Id4oqcRb2jTCIbnkZl16lnQE0Puwu13-sjW9MkthKuk8gEHQCqaOKHcbFxSJY8MMh-9P5tV5B3Jsfki-iq1S3lH5twyIWFGO7pZkSkhA-3q9W3l9Mt7tNX1ExidZez3FAJoHNaufMx2lVh-LsMjaGbkFd6PIk8zIgRhXLJjGu5kFj~laxUawDPTz2dk39fCRToBQRn~BoVyh-e2IRqfcpj6pac80iB-T~IB-s2YMn6ms0gFDw2Mzd9A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            />
            <Avatar
              name="Segun Adebayo"
              borderRadius="md"
              src="https://s3-alpha-sig.figma.com/img/175e/85ec/a0169fa7a0a11f4fc68511e2305a8e29?Expires=1632700800&Signature=AAmYG~2GxeBHGPrq5L-DBDCuSDsq0F8R9d7QoJfQwIlfxlRFvk3049FUMR-nLNQEonlTlhK77V7J7ocamq2Y7Jtbh3JCngX3hcNhRwSiJa5mjTXnsiwaW1fPEuPTWJXYwirLE7XrKYBNExi56jNMQaS2EEtAjRd8K4IZQzIlJLHnXwr95EMscokYLgu-5F6BLAjN~WhtPqSyNomNopf~FdCT6vIkxlqJ1WOY7UZOdW9UfXePcXQgjR60jyeV72VGvzNTyNO-do9bcXYJ6YE5nCNxB5-ciFD7rY3oPr191t47xVw8msQj48CoqARjgMHfcZpQE9HlKrs0ntSjwSkf-g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            />
            <Avatar
              name="Kent Dodds"
              borderRadius="md"
              src="https://s3-alpha-sig.figma.com/img/3afc/feff/98d73d776ae214d1bb70fb77c62e1c37?Expires=1632700800&Signature=CeWyaBzvryZhTCZwMkVk2msNSUySLSoM4O9bCr3AeYm9hn5RQoaTrhLt36z6B7DIgR36gWPkbRUaFZNIz93N5~LfeV6FfTyeqKp6Fno4rCQE3UaNaNFmVsGu7AqJr-uwLlK3u83WZAPBROAdqgoCNIUffUn~-3IAi~HqJa4CqTFeDu8k49T5ruxvlVolPLh3wdToDIXrMuNXO8HJ8vy-BoF6oPP5UKKxAelRIbTrzgvf48tDuLPGo-7T93JNyePixhbniAe1buZInugQjIKGitpt-60xo-K3N4qFlSSh~2~m96efpZzGbilbZ9nsM4C0H~XPR0qw0zbgL4FmKfjZeQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            />
          </AvatarGroup>
          <Box pe="8px">{channelDetails.members}</Box>
        </HStack>
      </HStack>
    </Box>
  );
};

const TobBarMobile = () => {
  return (
    <Box w="100%" bg="#00B87C" height="100px" px={5}>
      <Flex justifyContent="space-between" pt={5}>
        <HStack>
          <Icon as={BiChevronLeft} color="#FFFFFF" boxSize="40px" />
          <Stack color="white">
            <Text fontSize="18px"># Announcements</Text>
            <Text fontSize="12px" m="0px">
              1 member
            </Text>
          </Stack>
        </HStack>

        {/* <Icon as={<SearchsIcon />} color="#FFFFFF" /> */}
        <HStack>
          <Icon viewBox="0 0 16 15" color="red.500">
            <path
              fill="white"
              d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H15C15.2652 0 15.5196 0.105357 15.7071 0.292893C15.8946 0.48043 16 0.734784 16 1C16 1.26522 15.8946 1.51957 15.7071 1.70711C15.5196 1.89464 15.2652 2 15 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1ZM0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H15C15.2652 4 15.5196 4.10536 15.7071 4.29289C15.8946 4.48043 16 4.73478 16 5C16 5.26522 15.8946 5.51957 15.7071 5.70711C15.5196 5.89464 15.2652 6 15 6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5ZM0 9C0 8.73478 0.105357 8.48043 0.292893 8.29289C0.48043 8.10536 0.734784 8 1 8H6C6.26522 8 6.51957 8.10536 6.70711 8.29289C6.89464 8.48043 7 8.73478 7 9C7 9.26522 6.89464 9.51957 6.70711 9.70711C6.51957 9.89464 6.26522 10 6 10H1C0.734784 10 0.48043 9.89464 0.292893 9.70711C0.105357 9.51957 0 9.26522 0 9ZM0 13C0 12.7348 0.105357 12.4804 0.292893 12.2929C0.48043 12.1054 0.734784 12 1 12H6C6.26522 12 6.51957 12.1054 6.70711 12.2929C6.89464 12.4804 7 12.7348 7 13C7 13.2652 6.89464 13.5196 6.70711 13.7071C6.51957 13.8946 6.26522 14 6 14H1C0.734784 14 0.48043 13.8946 0.292893 13.7071C0.105357 13.5196 0 13.2652 0 13ZM11.5 9C11.1022 9 10.7206 9.15804 10.4393 9.43934C10.158 9.72064 10 10.1022 10 10.5C10 10.8978 10.158 11.2794 10.4393 11.5607C10.7206 11.842 11.1022 12 11.5 12C11.8978 12 12.2794 11.842 12.5607 11.5607C12.842 11.2794 13 10.8978 13 10.5C13 10.1022 12.842 9.72064 12.5607 9.43934C12.2794 9.15804 11.8978 9 11.5 9ZM8 10.5C8.00039 9.96749 8.12229 9.44209 8.35641 8.9638C8.59054 8.48552 8.93071 8.06696 9.35103 7.74C9.77134 7.41304 10.2607 7.18631 10.7819 7.07705C11.3031 6.9678 11.8423 6.97891 12.3586 7.10954C12.8748 7.24016 13.3544 7.48687 13.7609 7.83086C14.1674 8.17486 14.4901 8.60707 14.7043 9.09459C14.9185 9.58211 15.0187 10.1121 14.9971 10.6442C14.9756 11.1762 14.8329 11.6964 14.58 12.165L15.707 13.293C15.8892 13.4816 15.99 13.7342 15.9877 13.9964C15.9854 14.2586 15.8802 14.5094 15.6948 14.6948C15.5094 14.8802 15.2586 14.9854 14.9964 14.9877C14.7342 14.99 14.4816 14.8892 14.293 14.707L13.165 13.579C12.6318 13.8674 12.0329 14.0123 11.4269 13.9996C10.8208 13.987 10.2285 13.8171 9.70783 13.5068C9.18717 13.1964 8.75604 12.7561 8.45666 12.229C8.15729 11.7019 7.99993 11.1062 8 10.5Z"
            />
          </Icon>
          <Spacer />
          <Icon as={AiOutlineInfoCircle} color="#FFFFFF" w="24px" h="24px" />
        </HStack>
      </Flex>
    </Box>
  );
};

export { TopBar, TobBarMobile };
