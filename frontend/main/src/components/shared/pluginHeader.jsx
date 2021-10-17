import React, {useEffect} from "react";
import Parcel from "single-spa-react/parcel";
import { pluginHeader } from "@zuri/plugin-header";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChannelDetails } from '@zuri/zuri-ui';
import hashImage from "./assets/default.png";


const NewChannelHeader = ({ channelId }) => {

  // Handlers Channel Detail modal
  const { 
    isOpen: isChannelDetailOpen,
    onOpen: onOpenChannelDetails,
    onClose: onCloseChannelDetails
  } = useDisclosure()

  const { channelMember } = useSelector((state) => state.channelsReducer);
  const { users } = useSelector(state => state.appReducer)
  let _users;
  let orgId;
    
  useEffect(() => {
    _users = users;
    orgId = _users.currentWorkspace;
  });

  // console.log("This is the orgId plugin header", orgId)

  // const channel_id = channelId; //assigning dynamic channel id to channel_id

  const dispatch = useDispatch();
  const { _getChannelDetails } = bindActionCreators(appActions, dispatch); //extract redux function
  const { _removeChannelMember } = bindActionCreators(appActions, dispatch); //extract redux function
  const { _addChannelMember } = bindActionCreators(appActions, dispatch); //extract redux function
  // No need for Async function
  // const loadChannelDetails = async () => { 
  //   await _getChannelDetails(users.currentWorkspace, channelId);

  // };

  useEffect(() => {
    _getChannelDetails(users.currentWorkspace, channelId);
  }, [channelId]);
  
  const channelDetailsData = useSelector((state) => state.channelsReducer).channelDetails;//extract redux state
  console.log("all in the channel", channelDetailsData);//to see what kind of data I'm actually getting

  const isPrivate = channelDetailsData.private;// to check if channel is private or not

  let userList = [];

  let count =0;
  for (const key in channelDetailsData.users) {
    if (Object.hasOwnProperty.call(channelDetailsData.users, key)) {
      userList = [...userList,{"_id":channelDetailsData.users[key]._id, "email":`User${count}@mail.com`}]
      count++;
    }
  }
  const icon = hashImage;
  // {isPrivate ? icon = <Icon as={ BiLockAlt } color="#ffffff" h={5} w={5} mr={2}  /> : icon = <Icon as={ FiHash } color="#ffffff" h={5} w={5} mr={2} />};

  const pluginConfig = {
    name: channelDetailsData.name, //Name on header
    icon: icon , //Image on header
    thumbnailUrl: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg",
      "https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png",
    ], //Replace with images of users
    userCount:channelDetailsData.members, //User count on header
    eventTitle: onOpenChannelDetails,
    eventThumbnail: onOpenChannelDetails,
    hasThumbnail: true, //set false if you don't want thumbnail on the header

    // add and remove 
    
    roomInfo: {
      membersList: [...userList],
      addmembersevent: values => {
        console.warn("a plugin added ", values)
        let data = values.reduce((cum,val)=>([...cum,{_id:val.value}]),[])
        if(data){
          data = data.length >1?data:data[0];
           _addChannelMember(orgId, channelId,data)
        }
        
      },
      removememberevent: id => {
        console.warn("a plugin deleted ", id)
        if(id){
          _removeChannelMember(orgId, channelId, {_id:id})
        }
      }
    }
  };
  return (
    <>
    <Parcel
      config={pluginHeader}
      wrapWith="div"
      wrapStyle={{ width: "100%" }}
      headerConfig={pluginConfig}
    />
    <ChannelDetails
      channelDetailsConfig={{ showChannelDetails: isChannelDetailOpen }}
      handleCloseChannelDetails={onCloseChannelDetails}
    />
</>
  );
};

export default NewChannelHeader;
