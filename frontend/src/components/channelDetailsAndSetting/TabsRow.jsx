import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

export default function TabsRows({colors}) {
    return (
        <Tabs>
            <TabList borderBottom='0'>
                <Tab>About</Tab>
                <Tab>Members</Tab>
                <Tab>Integration</Tab>
                <Tab>Integration</Tab>
            </TabList>
        </Tabs>
    )
}
