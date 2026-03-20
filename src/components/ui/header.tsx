import { Box, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "./color-mode";
import { ITabsContent, LinkedTabs } from "../Tabs/LinkedTabs";

export default function Header() {
   const tabsContent: ITabsContent[] = [
      {
         title: "Inicio",
         value: "/dashboard",
      },
      {
         title: "Iniciar sesión",
         value: "/login",
      },
   ];
   return (
      <Box p={3} shadow={"sm"} mb={5}>
         <Flex justifyContent={"space-between"} gap={2}>
            <ColorModeButton />
            <LinkedTabs tabscontent={tabsContent} />
         </Flex>
      </Box>
   );
}
