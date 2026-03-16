'use client'
import { For, Tabs } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname, } from "next/navigation";
import React from "react";

export interface ITabsContent{
    title: string,
    value:string
}

export interface ITabs extends Tabs.RootProps{
    tabscontent: ITabsContent[]
}

export const LinkedTabs = React.forwardRef<HTMLElement, ITabs>(
    function LinkedTabs(props, _ref){
        const {tabscontent, ...rest} = props;
        const pathname = usePathname();
        const activeIndex = tabscontent.findIndex(tab => pathname.startsWith(tab.value));
        return <Tabs.Root value={tabscontent[activeIndex]?.value ?? tabscontent[0].value} variant="outline" {...props}>
            <Tabs.List>
                <For each={tabscontent}>
                    {(item)=>(
                        <Tabs.Trigger value={item.value} key={item.value}>
                            <NextLink href={item.value}>
                            {item.title}
                            </NextLink>
                        </Tabs.Trigger>)}
                </For>
                <Tabs.Indicator
                mt="-1.5px"
                height="2px"
                bg="whiteAlpha.300"
                borderRadius="5px"
                />
            </Tabs.List>
        </Tabs.Root>
    })