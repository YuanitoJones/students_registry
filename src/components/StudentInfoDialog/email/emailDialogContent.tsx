import { IEmail } from "@/lib/types/globalTypes";
import { Box, Button, HStack, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { LuEllipsisVertical } from "react-icons/lu";
import { Presence } from "@ark-ui/react";
import { toaster } from "@/components/ui/toaster";
import { StudentContext } from "@/lib/context/studentContext";

const EmailDialogContent = ({ email }: { email: IEmail }) => {
   const studentContext = useContext(StudentContext);
   if (!studentContext) throw new Error("Student context not in provider");
   const { emails, UPDATE_EMAIL, DELETE_EMAIL, SET_EDIT_DIALOG } = studentContext;
   const [emailState, setEmailState] = useState<IEmail>(email);
   const [dangerZone, setDangerZone] = useState<boolean>(false);
   const [tries, setTries] = useState<number>(0);

   const handleSubmit = async () => {
      try {
         const response = await studentRegistryClient.updateEmail({ ...emailState, ogEmail: email.email });
         toaster.create({
            description: "Correo actualizado exitosamente.",
            type: "info",
         });
         UPDATE_EMAIL(emails, email.email, response);
         SET_EDIT_DIALOG(false);
      } catch (err) {
         toaster.create({
            description: "Error al actualizar correo.",
            type: "error",
         });
      }
   };
   const handleChange = (field: keyof IEmail, value: string) => {
      setEmailState((prev) => ({ ...prev, [field]: value }));
   };

   const handleDelete = async () => {
      if (tries === 0) return setTries((s) => s + 1);
      try {
         await studentRegistryClient.deleteEmail(email.email);
         toaster.create({
            description: "Correo eliminado exitosamente.",
            type: "info",
         });
         DELETE_EMAIL(emails, email.email);
         SET_EDIT_DIALOG(false);
      } catch (err) {
         toaster.create({
            description: "Error al eliminar correo.",
            type: "error",
         });
      }
   };

   return (
      <Box width={"100%"}>
         <VStack width={"100%"} display={"flex"} alignItems={"flex-end"} mb={2}>
            <IconButton onClick={() => setDangerZone((s) => !s)} size={"xs"} bgColor={"white"} color={"black"}>
               <LuEllipsisVertical />
            </IconButton>
            <Presence present={dangerZone} style={{ width: "100%" }}>
               <Text color={"red"} textAlign={"center"}>
                  Zona de peligro
               </Text>
               <Box
                  p={2}
                  rounded={"md"}
                  borderWidth={"thin"}
                  borderColor={"red"}
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
               >
                  <Button onClick={handleDelete}>Eliminar</Button>
                  {tries > 0 && (
                     <Text fontSize={"10px"} position={"absolute"} fontWeight={600} color={"red"} right={75}>
                        Presiona nuevamente para elminar
                     </Text>
                  )}
               </Box>
            </Presence>
         </VStack>
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
            <Button onClick={() => SET_EDIT_DIALOG(false)} variant={"outline"}>
               Cancelar
            </Button>
            <Button onClick={() => handleSubmit()} type="button">
               Guardar
            </Button>
         </HStack>
      </Box>
   );
};

export default EmailDialogContent;
