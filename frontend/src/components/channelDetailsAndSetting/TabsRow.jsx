import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

<<<<<<< HEAD
export default function TabsRows({ colors }) {
  return (
    <>
      <TabList borderBottom="0" justifyContent="space-between" mt={4} pt={4}>
        <Tab p={0} color="#fff">
          About
        </Tab>
        <Tab p={0} color="#fff">
          Members
        </Tab>
        <Tab p={0} color="#fff">
          Integration
        </Tab>
        <Tab p={0} color="#fff">
          Settings
        </Tab>
      </TabList>
    </>
  );
=======
export default function TabsRows({colors}) {
    return (
        <>
            <TabList borderBottom='0' justifyContent="space-between" mt={4} pt={4}>
                <Tab p={0} _focus={{outline: "none"}}>About</Tab>
                <Tab p={0} _focus={{outline: "none"}}>Members</Tab>
                <Tab p={0} _focus={{outline: "none"}}>Integration</Tab>
                <Tab p={0} _focus={{outline: "none"}}>Settings</Tab>
            </TabList>
        </>
    )
>>>>>>> 7d333c776b2b4bd3baa3f590894592f5c626e249
}
