import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import AdditionalSettingsModal from "./AdditionalSettingsModal";
import NotificationModal from "../NotificationModal/NotificationModal";

const MoreOption = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isAddtionalSettingsOpen, onClose: onCloseAdditionalSettings, onOpen: onOpenAdditionalSettings } = useDisclosure();

  return (
    <>
      <NotificationModal isOpen={isOpen} onClose={onClose} />
      <AdditionalSettingsModal isOpen={isAddtionalSettingsOpen} onClose={onCloseAdditionalSettings} />
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
          <MenuItem onClick={onOpenAdditionalSettings}>Additional options</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default MoreOption;
