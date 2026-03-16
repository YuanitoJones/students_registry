'use client'
import { Box, Flex, HStack, Tabs, Text } from "@chakra-ui/react";
import { ColorModeButton } from "./color-mode";
import { ITabsContent, LinkedTabs } from "../Tabs/LinkedTabs";
import { useContext } from "react";
import { UserContext } from "@/lib/context/userContext";

export default function Header(){
    const userContext = useContext(UserContext)
    if(!userContext) throw new Error("UserContext must be used within provider")
    const {user} = userContext;
    const tabsContent:ITabsContent[] = [
        {
            title:"Inicio",
            value:"/dashboard"
        },
        {
            title:"Información",
            value:"/info"
        },
        user.email
        ? {
            title:"Mi cuenta",
            value:"/mi-cuenta"
        }
        :{
            title:"Iniciar sesión",
            value:"/login"
        }
    ]
    return <Box p={3} shadow={"sm"} mb={5}>
        <Flex justifyContent={"space-between"} gap={2}>
            <ColorModeButton />
            <LinkedTabs tabscontent={tabsContent} />
        </Flex>
    </Box>
}