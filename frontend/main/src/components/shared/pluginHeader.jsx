import React from "react";
import Parcel from "single-spa-react/parcel";
import { pluginHeader } from "@zuri/plugin-header";

const NewChannelHeader = () => {
  const pluginConfig = {
    name: "Channels Plugin", //Name on header
    icon: "https://www.pngfind.com/pngs/m/19-194225_png-file-svg-hashtag-icon-png-transparent-png.png", //Image on header
    thumbnailUrl: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg",
      "https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png",
    ], //Replace with images of users
    userCount: 20, //User count on header
    eventTitle: () => {
      //Block of code to be triggered on title click
    },
    eventThumbnail: () => {
      //Block of code to be triggered on thumbnail click
    },
    hasThumbnail: true, //set false if you don't want thumbnail on the header
  };
  return (
    <Parcel
      config={pluginHeader}
      wrapWith="div"
      wrapStyle={{ width: "100%" }}
      headerConfig={pluginConfig}
    />
  );
};

export default NewChannelHeader;
