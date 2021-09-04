import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

export default function TabsRows({colors}) {
    return (
        <>
            <TabList borderBottom='0'>
                <Tab pl={0}>About</Tab>
                <Tab>Members</Tab>
                <Tab>Integration</Tab>
                <Tab>Integration</Tab>
            </TabList>
        </>
    )
}
