import React from "react";
import { Box } from "@chakra-ui/layout";
import UserProfileHeader from "./UserProfileHeader";
// import UserProfileOnHover from './UserProfileOnHover';
import OnClickUserProfile from "./OnClickUserProfile";

const userProfile = () => {
  return <Box>
              <UserProfileHeader />
              <OnClickUserProfile />
              {/* <UserProfileOnHover /> */}
        </Box>;
};

export default userProfile;
