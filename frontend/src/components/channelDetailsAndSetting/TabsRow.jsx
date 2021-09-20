import React from 'react'
import { TabList, Tab } from "@chakra-ui/react"

export default function TabsRows({colors}) {
 
    return (
        <>
            <TabList borderBottom='0' justifyContent="space-between" mt={4} pt={4}>
                <Tab p={0}  _focus={{outline: "none"}}>About</Tab>
                <Tab p={0}  _focus={{outline: "none"}}>Members</Tab>
                <Tab p={0}  _focus={{outline: "none"}}>Integration</Tab>
                <Tab p={0}  _focus={{outline: "none"}}>Settings</Tab>
            </TabList>
        </>
    )
}
