import SelectField from "@/components/Inputs/SelectField";
import { toaster } from "@/components/ui/toaster";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { StudentContext } from "@/lib/context/studentContext";
import { IStudentbasicInfo } from "@/lib/types/globalTypes";
import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { gendersCollections } from "@/lib/types/globalTypes";

const StudentDialogContent = () => {
   const studentContext = useContext(StudentContext);
   if (!studentContext) throw new Error("Student context not in provider");
   const {
      first_name,
      middle_name,
      last_name,
      gender,
      student_id,
      emails,
      phones,
      addresses,
      SET_STUDENT,
      SET_EDIT_DIALOG,
   } = studentContext;
   const [studentstate, setStudentstate] = useState<IStudentbasicInfo>({
      first_name,
      middle_name,
      last_name,
      gender,
   });

   const handleSubmit = async () => {
      try {
         const response = await studentRegistryClient.updateStudent(student_id, studentstate);
         toaster.create({
            description: "Estudiante exitosamente.",
            type: "success",
         });
         SET_STUDENT({
            student_id,
            emails,
            phones,
            addresses,
            ...studentstate,
         });
         SET_EDIT_DIALOG(false);
      } catch (err) {
         toaster.create({
            description: "Error al actualizar dirección.",
            type: "error",
         });
      }
   };
   const handleChange = (field: keyof IStudentbasicInfo, value: string) => {
      setStudentstate((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <Box width={"100%"}>
         <HStack wrap={"wrap"}>
            <SelectField
               value={[String(studentstate.gender).charAt(0).toUpperCase() + String(studentstate.gender).slice(1)]}
               collection={gendersCollections}
               items={gendersCollections.items}
               onValueChange={(e) => {
                  handleChange("gender", e.value[0]);
               }}
            />
            <Input
               placeholder="Nombre"
               defaultValue={studentstate.first_name}
               onChange={(e) => handleChange("first_name", e.target.value)}
            />
            <Input
               placeholder="Estado"
               defaultValue={studentstate.middle_name}
               onChange={(e) => handleChange("middle_name", e.target.value)}
            />
            <Input
               placeholder="Ciudad"
               defaultValue={studentstate.last_name}
               onChange={(e) => handleChange("last_name", e.target.value)}
            />
         </HStack>
         <HStack mt={5} width={"100%"} justifyContent={"flex-end"} gap={10}>
            <Button onClick={() => {}} variant={"outline"}>
               Cancelar
            </Button>
            <Button onClick={handleSubmit} type="button">
               Guardar
            </Button>
         </HStack>
      </Box>
   );
};

export default StudentDialogContent;
