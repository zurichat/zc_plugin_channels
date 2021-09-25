import { Box } from "@chakra-ui/react";

function Backdrop({ clicked }) {
  return (
    <Box
      onClick={clicked}
      position="fixed"
      zIndex={30}
      width="100%"
      height="100vh"
      background="#0e0d0dad"
      top={0}
      left={0}
    ></Box>
  );
}

export default Backdrop;
