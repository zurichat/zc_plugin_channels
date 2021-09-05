import React from "react";
import { Box } from "@chakra-ui/layout";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileOnHover from './UserProfileOnHover';

const UserProfile = () => {
  return <Box>
              <UserProfileHeader />
              <UserProfileOnHover />
        </Box>;
};

export default UserProfile;
