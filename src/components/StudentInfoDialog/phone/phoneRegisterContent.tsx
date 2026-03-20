import { toaster } from "@/components/ui/toaster";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { StudentContext } from "@/lib/context/studentContext";
import { IPhone } from "@/lib/types/globalTypes";
import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";

const PhoneRegisterContent = () => {
   const studentContext = useContext(StudentContext);
   if (!studentContext) throw new Error("no student context in provider");
   const { ADD_PHONE, SET_REGISTER_DIALOG } = studentContext;
   const { student_id } = useParams();
   const [phoneState, setPhoneState] = useState<Omit<IPhone, "phone_id">>({
      phone: "",
      area_code: "",
      country_code: "",
      phone_type: "",
   });

   const handleSubmit = async () => {
      try {
         const response = await studentRegistryClient.createPhoneNumber({
            ...phoneState,
            student_id: Number(student_id),
         });
         toaster.create({
            description: "Número de teléfono asignado exitosamente.",
            type: "info",
         });
         ADD_PHONE(response);
         SET_REGISTER_DIALOG(false);
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
            <Button onClick={() => SET_REGISTER_DIALOG(false)} variant={"outline"}>
               Cancelar
            </Button>
            <Button onClick={handleSubmit}>Guardar</Button>
         </HStack>
      </Box>
   );
};

export default PhoneRegisterContent;
