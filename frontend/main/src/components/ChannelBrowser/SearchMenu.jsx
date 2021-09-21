import Icon from "@chakra-ui/icon";
import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Heading, HStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { BiSort } from "react-icons/bi";
import { GoSettings } from "react-icons/go";
import React from "react";
import { useSelector } from "react-redux";

const SearchMenu = () => {
  const { channels } = useSelector((state) => state.appReducer);

  return (
    <>
      <HStack
        mb={8}
        justifyContent="space-between"
        sx={{
          "@media screen and (max-width: 768.5px)": { marginBottom: "0" },
        }}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="#A1A1A1" fontSize=".8em" />}
          />
          <Input
            placeholder="Search by channel name or description"
            borderRadius="4px"
            borderColor="#A1A1A1"
            focusBorderColor="green.0"
            color="#A1A1A1"
            size="md"
            w="100%"
          />
        </InputGroup>
      </HStack>
      <HStack
        spacing="auto"
        pb={2}
        borderBottom="1px solid #D3D3D3"
        sx={{ "@media screen and (max-width: 768.5px)": { display: "none" } }}
      >
        <Heading size="md" fontSize="18px" fontWeight={700}>
          {channels && channels.length } recommended results
        </Heading>
        <HStack spacing="10px">
          <Menu isLazy>
            <MenuButton fontSize="17px">
              <Icon as={BiSort} mr={1} w="14px" /> Sort: Most recommended
            </MenuButton>
            <MenuList>
              <MenuItem>Most recommended</MenuItem>
              <MenuItem>Newest Channel</MenuItem>
              <MenuItem>Oldest Channel</MenuItem>
              <MenuItem>Most Members</MenuItem>
              <MenuItem>Fewset Members</MenuItem>
              <MenuItem>A to Z</MenuItem>
              <MenuItem>Z to A</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton fontSize="17px">
              <Icon as={GoSettings} mr={1} w="14px" /> Filter
            </MenuButton>
          </Menu>
        </HStack>
      </HStack>
    </>
  );
};

export default SearchMenu;
