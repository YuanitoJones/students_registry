import { Input, Stack, Text } from "@chakra-ui/react";
import CardComponent from "../Cards/CardComponent";
import { StepRenderContext } from "@/app/students/register/register.types";

const AddressRegisterStep = ({ ctx }: { ctx: StepRenderContext }) => {
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
                     placeholder="Código postal"
                     value={ctx.formData.address.zip_postcode}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           address: { ...ctx.formData.address, zip_postcode: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
                  <Input
                     flex={5}
                     placeholder="Estado"
                     value={ctx.formData.address.state}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           address: { ...ctx.formData.address, state: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
                  <Input
                     placeholder="Ciudad"
                     value={ctx.formData.address.city}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           address: { ...ctx.formData.address, city: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
                  <Input
                     placeholder="Dirección"
                     value={ctx.formData.address.address_line}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           address: { ...ctx.formData.address, address_line: e.target.value },
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

export default AddressRegisterStep;
