import { Avatar} from "@chakra-ui/react";
import {  Input } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/layout";
import React from "react";
import { AvatarBadge } from "@chakra-ui/avatar";

const TopSearch = () => {
  return (
    <HStack mb={4} justifyContent="space-between">
      <Input
        placeholder="Search here"
        borderRadius="md"
        borderColor="rgba(153, 153, 153, 0.2)"
        color="#999"
        size="md"
        w="34%"
      />

      <HStack spacing={4}>
        {/* <Icon boxSize="1.3rem" color="#2b2b2b" as={FiSettings} /> */}
        <Avatar
          src="https://s3-alpha-sig.figma.com/img/e681/51b8/15187abf9e80c64eaabed22ad5ad502c?Expires=1632700800&Signature=FJ0lIAiKy7IWyArlymep5w3Xb6Vc7xeSL2L-JH~hp8c8uV~6hqzaKZID0iRTlZoyHHw9Q8nrsDRNCD869uuM1sOJGEX7~L-Id4oqcRb2jTCIbnkZl16lnQE0Puwu13-sjW9MkthKuk8gEHQCqaOKHcbFxSJY8MMh-9P5tV5B3Jsfki-iq1S3lH5twyIWFGO7pZkSkhA-3q9W3l9Mt7tNX1ExidZez3FAJoHNaufMx2lVh-LsMjaGbkFd6PIk8zIgRhXLJjGu5kFj~laxUawDPTz2dk39fCRToBQRn~BoVyh-e2IRqfcpj6pac80iB-T~IB-s2YMn6ms0gFDw2Mzd9A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          alt=""
          borderRadius="md"
          size="sm"
        >
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      </HStack>
    </HStack>
  );
};

export default TopSearch;
