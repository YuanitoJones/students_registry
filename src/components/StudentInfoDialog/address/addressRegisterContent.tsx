import { IAddress, IEmail } from "@/lib/types/globalTypes";
import { Box, Button, HStack, Input, Textarea } from "@chakra-ui/react";
import { useContext, useState } from "react";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { toaster } from "@/components/ui/toaster";
import { useParams } from "next/navigation";
import { StudentContext } from "@/lib/context/studentContext";

const AddressRegistercontent = () => {
   const studentContext = useContext(StudentContext);
   if (!studentContext) throw new Error("no student context in provider");
   const { ADD_ADDRESS, SET_REGISTER_DIALOG } = studentContext;
   const { student_id } = useParams();
   const initialState = {
      address_line: "",
      city: "",
      state: "",
      zip_postcode: "",
   };
   const [addressState, setAddressState] = useState<Omit<IAddress, "address_id">>(initialState);

   const handleSubmit = async () => {
      try {
         const response = await studentRegistryClient.createAddress({
            ...addressState,
            student_id: Number(student_id),
         });
         toaster.create({
            description: "Dirección asignado exitosamente.",
            type: "info",
         });
         ADD_ADDRESS(response);
         SET_REGISTER_DIALOG(false);
      } catch (err) {
         toaster.create({
            description: "Error al crear dirección.",
            type: "error",
         });
      }
   };
   const handleChange = (field: keyof IAddress, value: string) => {
      setAddressState((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <Box width={"100%"}>
         <HStack wrap={"wrap"}>
            <Input
               placeholder="Código postal"
               defaultValue={addressState.zip_postcode}
               onChange={(e) => handleChange("zip_postcode", e.target.value)}
            />
            <Input
               placeholder="Estado"
               defaultValue={addressState.state}
               onChange={(e) => handleChange("state", e.target.value)}
            />
            <Input
               placeholder="Ciudad"
               defaultValue={addressState.city}
               onChange={(e) => handleChange("city", e.target.value)}
            />
            <Textarea
               placeholder="Dirección"
               maxLines={2}
               defaultValue={addressState.address_line}
               onChange={(e) => handleChange("address_line", e.target.value)}
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

export default AddressRegistercontent;
