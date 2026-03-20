import { StepRenderContext } from "@/app/students/register/register.types";
import CardComponent from "../Cards/CardComponent";
import { Box, Input, Stack, Text } from "@chakra-ui/react";

const EmailRegisterstep = ({ ctx }: { ctx: StepRenderContext }) => {
   return (
      <Box>
         <CardComponent
            width={"800px"}
            title={<Text>Información del correo</Text>}
            description={{ description: "Por favor ingresa el la información personal del estudiante" }}
            body={{
               children: (
                  <Stack direction={"row"}>
                     <Input
                        placeholder="Correo"
                        value={ctx.formData.email.email}
                        onChange={(e) => {
                           ctx.setFormData({
                              ...ctx.formData,
                              email: { ...ctx.formData.email, email: e.target.value },
                           });
                           ctx.setError(null);
                        }}
                     />
                     <Input
                        placeholder="Tipo de coreo"
                        value={ctx.formData.email.email_type}
                        onChange={(e) => {
                           ctx.setFormData({
                              ...ctx.formData,
                              email: { ...ctx.formData.email, email_type: e.target.value },
                           });
                           ctx.setError(null);
                        }}
                     />
                  </Stack>
               ),
            }}
         />
      </Box>
   );
};

export default EmailRegisterstep;
