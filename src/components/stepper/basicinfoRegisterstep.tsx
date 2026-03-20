import { StepRenderContext } from "@/app/students/register/register.types";
import CardComponent from "../Cards/CardComponent";
import { Input, Stack, Text } from "@chakra-ui/react";

import { gendersCollections } from "@/lib/types/globalTypes";
import SelectField from "../Inputs/SelectField";

const BasicinfoStep = ({ ctx }: { ctx: StepRenderContext }) => {
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
                     placeholder="Primer nombre"
                     value={ctx.formData.studentInfo.first_name}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           studentInfo: { ...ctx.formData.studentInfo, first_name: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
                  <Input
                     flex={1}
                     placeholder="Segundo nombre"
                     value={ctx.formData.studentInfo.middle_name}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           studentInfo: { ...ctx.formData.studentInfo, middle_name: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
                  <Input
                     placeholder="Apellido(s)"
                     value={ctx.formData.studentInfo.last_name}
                     onChange={(e) => {
                        ctx.setFormData({
                           ...ctx.formData,
                           studentInfo: { ...ctx.formData.studentInfo, last_name: e.target.value },
                        });
                        ctx.setError(null);
                     }}
                  />
                  <SelectField
                     collection={gendersCollections}
                     items={gendersCollections.items}
                     onValueChange={(e) => {
                        console.log("e: ", e);
                        ctx.setFormData({
                           ...ctx.formData,
                           studentInfo: { ...ctx.formData.studentInfo, gender: e.value[0] },
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

export default BasicinfoStep;
