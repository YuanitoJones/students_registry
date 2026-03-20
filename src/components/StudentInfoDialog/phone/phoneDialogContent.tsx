import { IPhone } from "@/lib/types/globalTypes";
import { Box, Button, HStack, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { LuEllipsisVertical } from "react-icons/lu";
import { Presence } from "@ark-ui/react";
import { toaster } from "@/components/ui/toaster";
import { StudentContext } from "@/lib/context/studentContext";

const PhoneDialogContent = ({ phone }: { phone: IPhone }) => {
   const studentContext = useContext(StudentContext);
   if (!studentContext) throw new Error("Student context not in provider");
   const { phones, UPDATE_PHONE, DELETE_PHONE, SET_EDIT_DIALOG } = studentContext;
   const [phoneState, setPhoneState] = useState<IPhone>(phone);
   const [dangerZone, setDangerZone] = useState<boolean>(false);
   const [tries, setTries] = useState<number>(0);

   const handleSubmit = async () => {
      try {
         const response = await studentRegistryClient.updatePhoneNumber(phoneState);
         toaster.create({
            description: "Número de teléfono actualizado exitosamente.",
            type: "info",
         });
         UPDATE_PHONE(phones, phone.phone_id, response);
         SET_EDIT_DIALOG(false);
      } catch (err) {
         toaster.create({
            description: "Error al actualizar número teleefónico.",
            type: "error",
         });
      }
   };
   const handleChange = (field: keyof IPhone, value: string) => {
      setPhoneState((prev) => ({ ...prev, [field]: value }));
   };

   const handleDelete = async () => {
      if (tries === 0) return setTries((s) => s + 1);
      try {
         await studentRegistryClient.deletePhoneNumber(phoneState.phone_id);
         toaster.create({
            description: "Número de teléfono eliminado exitosamente.",
            type: "info",
         });
         DELETE_PHONE(phones, phone.phone_id);
         SET_EDIT_DIALOG(false);
      } catch (err) {
         toaster.create({
            description: "Error al eliminar número telefónico.",
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
               placeholder="Número telefónico"
               defaultValue={phoneState.phone}
               onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Input
               placeholder="Área"
               defaultValue={phoneState.area_code}
               onChange={(e) => handleChange("area_code", e.target.value)}
            />
            <Input
               placeholder="Código de país"
               defaultValue={phoneState.country_code}
               onChange={(e) => handleChange("country_code", e.target.value)}
            />
            <Input
               placeholder="Tipo de número"
               defaultValue={phoneState.phone_type}
               onChange={(e) => handleChange("phone_type", e.target.value)}
            />
         </HStack>
         <HStack mt={5} width={"100%"} justifyContent={"flex-end"} gap={10}>
            <Button onClick={handleSubmit} variant={"outline"}>
               Cancelar
            </Button>
            <Button onClick={handleSubmit}>Guardar</Button>
         </HStack>
      </Box>
   );
};

export default PhoneDialogContent;
