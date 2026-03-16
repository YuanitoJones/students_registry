"use client";
import { Table } from "@/components/ui/table";
import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
   const [data, setData] = useState([{ x: Date.now(), y: 0 }]);

   useEffect(() => {
      // Simulate streaming updates
      setData((prev) => [...prev.slice(-49), { x: Date.now(), y: Math.random() * 100 }]);
      // const interval = setInterval(() => {
      // }, 1000);
      // return () => clearInterval(interval);
   }, []);

   return (
      <VStack>
         <Box>
            <Table
               pageSize={5}
               scrollBehavior={"smooth"}
               width={"md"}
               headers={[{ title: "header 1" }, { title: "header2" }, { title: "header3" }, { title: "header4" }]}
               body={[
                  {
                     children: [<div>ola1</div>, <div>jeje</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola2</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola3</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola4</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola5</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola6</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola7</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola8</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola9</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola10</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola11</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola12</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola13</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola14</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola15</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola16</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola17</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
                  {
                     children: [<div>ola18</div>, <div>juju</div>, <div>adios</div>, <div>popo</div>],
                  },
               ]}
            />
         </Box>
      </VStack>
   );
}
