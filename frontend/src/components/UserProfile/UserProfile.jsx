import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import UserProfileOnHover from "./UserProfileOnHover";
import OnClickUserProfile from "./OnclickuserProfile";


  const UserProfile = () => {
    const [showProfile, setShowProfile] = useState(false);

  return <Box h='100vh' bgColor='#E5E5E5'>
              <UserProfileOnHover setShowProfile={setShowProfile} />
              <OnClickUserProfile showProfile={showProfile} setShowProfile={setShowProfile} />
        </Box>;
};

export default UserProfile;
