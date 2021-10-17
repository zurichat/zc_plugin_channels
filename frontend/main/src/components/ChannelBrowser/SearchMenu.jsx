import Icon from "@chakra-ui/icon";
import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Heading, HStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { BiSort } from "react-icons/bi";
import { GoSettings } from "react-icons/go";
import {React, useState} from "react";


const SearchMenu = ({ sortBy, searchChannel, channels}) => {
  const [sortButtonTitle, setSortButtonTitle] = useState("Most recommended")
  return (
    <>
      <HStack
        mt="50px"
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
            onChange={e =>searchChannel(e.target.value)}
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
          {channels.length } recommended results
        </Heading>
        <HStack spacing="10px">
          <Menu isLazy>
            <MenuButton fontSize="17px">
              <Icon as={BiSort} mr={1} w="14px" /> Sort: {sortButtonTitle}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => { setSortButtonTitle("Most recommended"); sortBy("recommended"); }}>Most recommended</MenuItem>
              <MenuItem onClick={() => { setSortButtonTitle("Newest Channel"); sortBy("newest")}}>Newest Channel</MenuItem>
              <MenuItem onClick={() => { setSortButtonTitle("Oldest Channel"); sortBy("oldest")}}>Oldest Channel</MenuItem>
              <MenuItem onClick={() => { setSortButtonTitle("Least Members"); sortBy("leastMembers") }}>Least Members</MenuItem>
              <MenuItem onClick={() => { setSortButtonTitle("Most Members"); sortBy("mostMembers") }}>Most Members</MenuItem>
              <MenuItem onClick={() => { setSortButtonTitle("A to Z"); sortBy("name")}}>A to Z</MenuItem>
              <MenuItem onClick={() => { setSortButtonTitle("Z to A"); sortBy("nameReverse")}}>Z to A</MenuItem>
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
