import React from 'react'
import { Tabs, Text, Spacer, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

export default function TabsRows({colors}) {
  const MembersTotal = {
      membersCount : '540'
  }



    return (
        <>
            <TabList borderBottom='0' justifyContent="space-between" mt={4} pt={4}>
                <Tab p={0} color=' #000000' _focus={{outline: "none"}}>About</Tab>
                <Tab p={0} color=' #000000' _focus={{outline: "none"}}>Members  <Text color='#8B8B8B' pl={2}> {MembersTotal.membersCount} </Text></Tab>
                <Tab p={0} color=' #000000' _focus={{outline: "none"}}>Integration</Tab>
                <Tab p={0} color=' #000000' _focus={{outline: "none"}}>Settings</Tab>
            </TabList>
        </>
    )
}
