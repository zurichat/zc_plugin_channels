import React from 'react'
import { TabList, Tab } from "@chakra-ui/react"

export default function TabsRows({ colors }) {

    return (
        <>
            <TabList borderBottom='0' display='flex' mt={4} pt={4}>
                <Tab p={2} _focus={{ outline: "none" }}>About</Tab>
                <Tab p={2} _focus={{ outline: "none" }}>Members</Tab>
                <Tab p={2} _focus={{ outline: "none" }}>Integration</Tab>
                <Tab p={2} _focus={{ outline: "none" }}>Settings</Tab>
            </TabList>
        </>
    )
}
