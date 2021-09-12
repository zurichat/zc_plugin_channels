import React from "react";
import { Box } from "@chakra-ui/layout";

import UserProfileOnHover from './UserProfileOnHover';
import OnclickuserProfile from "./OnclickuserProfile";

const UserProfile = () => {
  return <Box h='100vh' bgColor='#E5E5E5'>
              
              <UserProfileOnHover />
              <OnclickuserProfile />
        </Box>;
};

export default UserProfile;
