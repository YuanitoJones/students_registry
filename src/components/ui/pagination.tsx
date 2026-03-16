import { ButtonGroup, Pagination as ChakraPagination, IconButton, PaginationPageChangeDetails } from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export interface IPagination extends ChakraPagination.RootProps{
    count:number
    pageSize?: number
    position?:"left" | "middle" | "right"
    onPageChange?: ((details: PaginationPageChangeDetails) => void) | undefined
}

export const Pagination = React.forwardRef<HTMLElement, IPagination>(
    function Pagination(props, ref){
        const {count, pageSize = 5, position = "left", ...rest} = props;
        return(
            <ChakraPagination.Root count={count} pageSize={pageSize} defaultPage={1} maxW={"100%"} {...rest}>
                <ButtonGroup variant={"ghost"} size={"sm"} w={"full"}>
                    <ChakraPagination.PageText format="long" page={"1"}/>
                    <ChakraPagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </ChakraPagination.PrevTrigger>
        <ChakraPagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </ChakraPagination.NextTrigger>
                </ButtonGroup>
            </ChakraPagination.Root>
        )
    }
)