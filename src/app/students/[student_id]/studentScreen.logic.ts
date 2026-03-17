"use client";

import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { IStudent } from "@/lib/types/globalTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useStudentScreenLogic() {
   const [studentData, setStudentData] = useState<IStudent | undefined>(undefined);
   const { student_id } = useParams();
   useEffect(() => {
      const fetchStudentData = async () => {
         const response = await studentRegistryClient.getStudentById(Number(student_id));
         setStudentData(response);
      };
      fetchStudentData();
   }, []);

   return {
      studentData,
   };
}
