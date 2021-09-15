import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React,{useState} from "react";
import { BsThreeDots } from "react-icons/bs";
import NotificationModal from "../NotificationModal/NotificationModal";
import AdditionalSettingModal from "../AdditionalSettingModal/AdditionalSettingModal";
const MoreOption = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [additionalModal, setAdditionalModal] = useState(false)
  return (
    <>
      <NotificationModal isOpen={isOpen} onClose={onClose} />
      <AdditionalSettingModal isOpen={additionalModal} onClose={()=>setAdditionalModal(false)}/>
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

export default MoreOption;
