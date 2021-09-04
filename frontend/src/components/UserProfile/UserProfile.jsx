import React from "react";
import { Box } from "@chakra-ui/layout";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileOnClick from "./UserProfileOnClick";
const userProfile = () => {
  return <Box>
              <UserProfileHeader />
              <UserProfileOnClick />
        </Box>;
};

export default userProfile;
