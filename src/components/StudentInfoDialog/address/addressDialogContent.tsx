import { IAddress } from "@/lib/types/globalTypes";
import { Box, Button, HStack, IconButton, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { LuEllipsisVertical } from "react-icons/lu";
import { Presence } from "@ark-ui/react";
import { toaster } from "@/components/ui/toaster";
import { StudentContext } from "@/lib/context/studentContext";

const AddressDialogContent = ({ address }: { address: IAddress }) => {
   const studentContext = useContext(StudentContext);
   if (!studentContext) throw new Error("Student context not in provider");
   const { addresses, UPDATE_ADDRESS, DELETE_ADDRESS, SET_EDIT_DIALOG } = studentContext;
   const [addresState, setAddresState] = useState<IAddress>(address);
   const [dangerZone, setDangerZone] = useState<boolean>(false);
   const [tries, setTries] = useState<number>(0);

   const handleSubmit = async () => {
      try {
         const response = await studentRegistryClient.updateAddress(addresState);
         toaster.create({
            description: "Dirección actualizada exitosamente.",
            type: "info",
         });
         UPDATE_ADDRESS(addresses, address.address_id, response);
         SET_EDIT_DIALOG(false);
      } catch (err) {
         toaster.create({
            description: "Error al actualizar dirección.",
            type: "error",
         });
      }
   };
   const handleChange = (field: keyof IAddress, value: string) => {
      setAddresState((prev) => ({ ...prev, [field]: value }));
   };

   const handleDelete = async () => {
      if (tries === 0) return setTries((s) => s + 1);
      try {
         await studentRegistryClient.deleteAddress(address.address_id);
         toaster.create({
            description: "Dirección eliminada exitosamente.",
            type: "info",
         });
         DELETE_ADDRESS(addresses, address.address_id);
         SET_EDIT_DIALOG(false);
      } catch (err) {
         toaster.create({
            description: "Error al eliminar dirección.",
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
               placeholder="Código postal"
               defaultValue={addresState.zip_postcode}
               onChange={(e) => handleChange("zip_postcode", e.target.value)}
            />
            <Input
               placeholder="Estado"
               defaultValue={addresState.state}
               onChange={(e) => handleChange("state", e.target.value)}
            />
            <Input
               placeholder="Ciudad"
               defaultValue={addresState.city}
               onChange={(e) => handleChange("city", e.target.value)}
            />
            <Textarea
               placeholder="Dirección"
               maxLines={2}
               defaultValue={addresState.address_line}
               onChange={(e) => handleChange("address_line", e.target.value)}
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

export default AddressDialogContent;
