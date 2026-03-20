"use client";
import { Table } from "@/components/ui/table";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { IStudent } from "@/lib/types/globalTypes";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

export default function Dashboard() {
   const router = useRouter();
   const [data, setData] = useState<IStudent[]>([]);

   useEffect(() => {
      const getStudents = async () => {
         const response = await studentRegistryClient.getAllStudents();
         setData(response);
      };
      getStudents();
   }, []);

   return (
      <VStack gap={10}>
         <Text fontSize={"2xl"} fontWeight={"bold"}>
            Estudiantes Registrados
         </Text>
         <Box width={"100%"} display={"flex"} justifyContent={"flex-end"} px={8}>
            <Button size={"xs"} onClick={() => router.replace("/students/register")}>
               <LuPlus />
               <Text>Registrar nuevo</Text>
            </Button>
         </Box>
         <Box>
            <Table
               interactive
               onRowClick={(_e, index) => {
                  console.log("Clicked row: ", data[index]);
                  router.replace(`/students/${data[index].student_id}`);
               }}
               pageSize={5}
               scrollBehavior={"smooth"}
               width={"1400px"}
               headers={[{ title: "Nombre" }, { title: "Apellido" }, { title: "Correo" }, { title: "Teléfono" }]}
               body={data.map((student: IStudent) => {
                  return {
                     children: [
                        <div>{`${student.first_name} ${student.middle_name}`}</div>,
                        <div>{student.last_name}</div>,
                        <div>{student.emails[0]?.email}</div>,
                        <div>{student.phones[0]?.phone}</div>,
                     ],
                  };
               })}
            />
         </Box>
      </VStack>
   );
}
