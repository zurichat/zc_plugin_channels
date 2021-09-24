import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React,{useState} from "react";
import PropTypes from 'prop-types'
import { BsThreeDots } from "react-icons/bs";
import NotificationModal from "../NotificationModal/NotificationModal";
import AdditionalSettingModal from "../AdditionalSettingModal/AdditionalSettingModal";


const MoreOption = ({ actions  }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [additionalModal, setAdditionalModal] = useState(false)
  return (
    <>
      <NotificationModal isOpen={isOpen} onClose={onClose} />
      <AdditionalSettingModal actions={actions} isOpen={additionalModal} onClose={()=>setAdditionalModal(false)}/>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BsThreeDots color="#333333" />}
          rounded="full"
          mb="5px"
          _hover={{ bgColor: "#00B87C", color: "white" }}
        />
        <MenuList>
          <MenuItem onClick={onOpen}>Notification settings</MenuItem>
          <MenuItem>Huddle settings</MenuItem>
          <MenuItem onClick={()=>setAdditionalModal(true)}>Additional options</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

MoreOption.propTypes = {
  actions: PropTypes.objectOf(
    PropTypes.func
  ),
  // triggerArchiveChannel: PropTypes.func,
  // triggerMakeChannelPrivate: PropTypes.func,
  // triggerDeleteChannel: PropTypes.func
}
export default MoreOption;
