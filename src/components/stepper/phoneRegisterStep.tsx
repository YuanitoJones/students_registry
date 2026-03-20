import { Input, Stack, Text } from "@chakra-ui/react";
import CardComponent from "../Cards/CardComponent";
import { StepRenderContext } from "@/app/students/register/register.types";

const PhoneRegisterStep = ({ ctx }: { ctx: StepRenderContext }) => {
   return (
      <CardComponent
         width={"800px"}
         title={<Text>Información del estudiante</Text>}
         description={{ description: "Por favor ingresa el la información personal del estudiante" }}
         body={{
            children: (
               <Stack direction={"row"} wrap={"wrap"}>
                  <Input
                     flex={1}
                     placeholder="Área"
                     value={ctx.formData.phone.area_code}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           phone: { ...ctx.formData.phone, area_code: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
                  <Input
                     flex={5}
                     placeholder="Número telefónico"
                     value={ctx.formData.phone.phone}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           phone: { ...ctx.formData.phone, phone: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
                  <Input
                     placeholder="Código de país"
                     value={ctx.formData.phone.country_code}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           phone: { ...ctx.formData.phone, country_code: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
                  <Input
                     placeholder="Tipo de número"
                     value={ctx.formData.phone.phone_type}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           phone: { ...ctx.formData.phone, phone_type: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
               </Stack>
            ),
         }}
      />
   );
};

export default PhoneRegisterStep;
