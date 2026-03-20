"use client";
import { Table as ChakraTable, Flex, For, PaginationPageChangeDetails, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Pagination } from "./pagination";

export interface ITableHeader extends ChakraTable.HeaderProps {
   title: string;
}

export interface ITableBody extends ChakraTable.BodyProps {
   children: any[];
}

export interface ITableFooter extends ChakraTable.FooterProps {}

export interface TableProps extends ChakraTable.RootProps {
   size?: "sm" | "md" | "lg";
   headers: ITableHeader[];
   body: ITableBody[];
   disableheaders?: boolean;
   pageSize?: number;
   onRowClick?: (rowData: any, index: number) => void;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(props, ref) {
   const { headers, body, disableheaders = false, pageSize = 10, onRowClick, ...rest } = props;
   const [page, setPage] = useState(1);

   function onPageChange(e: PaginationPageChangeDetails) {
      setPage(e.page);
   }

   const startRange = (page - 1) * pageSize;
   const endRange = startRange + pageSize;
   const visibleItems = body.slice(startRange, endRange);
   return (
      <Flex direction={"column"} gap={1}>
         <ChakraTable.Root {...rest}>
            {!disableheaders && (
               <ChakraTable.Header>
                  <ChakraTable.Row>
                     <For each={headers}>
                        {(item, index) => (
                           <ChakraTable.ColumnHeader key={`${item["title"]}-${index}`}>
                              <Text>{item["title"]}</Text>
                           </ChakraTable.ColumnHeader>
                        )}
                     </For>
                  </ChakraTable.Row>
               </ChakraTable.Header>
            )}
            <ChakraTable.Body>
               <For each={visibleItems}>
                  {(row, index) => {
                     const absoluteIndex = startRange + index;
                     return (
                        <ChakraTable.Row
                           onClick={() => {
                              onRowClick && onRowClick(row, absoluteIndex);
                           }}
                           key={`table-row-${index}`}
                        >
                           <For each={row["children"]}>
                              {(cell, index) => (
                                 <ChakraTable.Cell key={`cell_value-${cell}-${index}`}>{cell}</ChakraTable.Cell>
                              )}
                           </For>
                        </ChakraTable.Row>
                     );
                  }}
               </For>
            </ChakraTable.Body>
         </ChakraTable.Root>
         <Pagination count={body.length} pageSize={pageSize} onPageChange={(e) => onPageChange(e)} />
      </Flex>
   );
});
