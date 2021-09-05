import React from "react";
import { Box } from "@chakra-ui/layout";
import UserProfileHeader from "./UserProfileHeader";
<<<<<<< HEAD
import UserProfileOnHover from "./UserProfileOnHover";

const userProfile = () => {
  return (
    <Box>
      <UserProfileHeader />
      <UserProfileOnHover />
    </Box>
  );
=======
import UserProfileOnHover from './UserProfileOnHover';
import OnclickuserProfile from "./OnclickuserProfile";

const UserProfile = () => {
  return <Box>
              <UserProfileHeader />
              <UserProfileOnHover />
              <OnclickuserProfile />
        </Box>;
>>>>>>> 7d333c776b2b4bd3baa3f590894592f5c626e249
};

export default UserProfile;
