import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
<<<<<<< HEAD
import UserProfileOnHover from './UserProfileOnHover';
import OnClickUserProfile from "./OnclickuserProfile";
=======
import UserProfileOnHover from "./UserProfileOnHover";
import OnClickUserProfile from "./OnClickUserProfile";
>>>>>>> 790a3a1d74e343fce58c5dfaae703d6f16a7c1eb

const UserProfile = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <Box h="100vh" bgColor="#E5E5E5">
      <UserProfileOnHover setShowProfile={setShowProfile} />
      <OnClickUserProfile showProfile={showProfile && setShowProfile} />
    </Box>
  );
};

export default UserProfile;
