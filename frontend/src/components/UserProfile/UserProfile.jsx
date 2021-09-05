import React from "react";
import { Box } from "@chakra-ui/layout";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileOnHover from './UserProfileOnHover';
// import OnclickuserProfile from "./OnclickuserProfile";

const UserProfile = () => {
  return <Box>
              <UserProfileHeader />
              <UserProfileOnHover />
              {/* <OnclickuserProfile /> */}
        </Box>;
};

export default UserProfile;
