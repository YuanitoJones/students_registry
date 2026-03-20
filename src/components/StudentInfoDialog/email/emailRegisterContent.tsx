import { IEmail } from "@/lib/types/globalTypes";
import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { toaster } from "@/components/ui/toaster";
import { useParams } from "next/navigation";
import { StudentContext } from "@/lib/context/studentContext";

const EmailRegistercontent = () => {
   const studentContext = useContext(StudentContext);
   if (!studentContext) throw new Error("no student context in provider");
   const { ADD_EMAIL, SET_REGISTER_DIALOG } = studentContext;
   const { student_id } = useParams();
   const initialState = {
      email: "",
      email_type: "",
   };
   const [emailState, setEmailState] = useState<IEmail>(initialState);

   const handleSubmit = async () => {
      try {
         const response = await studentRegistryClient.createEmail({ ...emailState, student_id: Number(student_id) });
         toaster.create({
            description: "Correo asignado exitosamente.",
            type: "success",
         });
         ADD_EMAIL(response);
         SET_REGISTER_DIALOG(false);
      } catch (err) {
         toaster.create({
            description: "Error al crear correo.",
            type: "error",
         });
      }
   };
   const handleChange = (field: keyof IEmail, value: string) => {
      setEmailState((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <Box width={"100%"}>
         <HStack wrap={"wrap"}>
            <Input
               placeholder="Correo"
               defaultValue={emailState.email}
               onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
               placeholder="Tipo de correo"
               defaultValue={emailState.email_type}
               onChange={(e) => handleChange("email_type", e.target.value)}
            />
         </HStack>
         <HStack mt={5} width={"100%"} justifyContent={"flex-end"} gap={10}>
            <Button onClick={() => SET_REGISTER_DIALOG(false)} variant={"outline"} type="button">
               Cancelar
            </Button>
            <Button onClick={handleSubmit} type="submit">
               Guardar
            </Button>
         </HStack>
      </Box>
   );
};

export default EmailRegistercontent;
