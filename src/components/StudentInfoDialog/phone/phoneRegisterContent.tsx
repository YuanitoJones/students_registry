import { Toaster, toaster } from "@/components/ui/toaster";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { IPhone } from "@/lib/types/globalTypes";
import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";

const PhoneRegisterContent = () => {
   const { student_id } = useParams();
   const [phoneState, setPhoneState] = useState<Omit<IPhone, "phone_id">>({
      phone: "",
      area_code: "",
      country_code: "",
      phone_type: "",
   });

   const handleSubmit = async () => {
      try {
         await studentRegistryClient.createPhoneNumber({ ...phoneState, student_id: Number(student_id) });
         toaster.create({
            description: "Número de teléfono asignado exitosamente.",
            type: "info",
         });
      } catch (err) {
         toaster.create({
            description: "Error al guardar número teleefónico.",
            type: "error",
         });
      }
   };
   const handleChange = (field: keyof IPhone, value: string) => {
      setPhoneState((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <Box width={"100%"}>
         <HStack wrap={"wrap"}>
            <Input
               placeholder="Correo"
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
         <Toaster />
      </Box>
   );
};

export default PhoneRegisterContent;
