import React from "react";
import { Box } from "@chakra-ui/layout";
import UserProfileHeader from "./UserProfileHeader";
import OnClickUserProfile from "./OnclickuserProfile";

const userProfile = () => {
  return <Box>
              <UserProfileHeader />
              <OnClickUserProfile />
        </Box>;
};

export default userProfile;
