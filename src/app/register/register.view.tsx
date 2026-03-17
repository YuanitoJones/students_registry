"use client";
import { Box, Button, ButtonGroup, Container, Input, Portal, Select, Stack, Steps, Text } from "@chakra-ui/react";
import { registerStudentForm, StepData, StudentRegistryLogic } from "./register.types";
import { useState } from "react";
import CardComponent from "@/components/Cards/CardComponent";
import { gendersCollections } from "@/lib/types/globalTypes";

export function StudentRegistryView({ register, handleSubmit, onSubmit }: StudentRegistryLogic) {
   const [formData, setFormData] = useState<registerStudentForm>({
      studentInfo: {
         first_name: "",
         middle_name: "",
         last_name: "",
         gender: "",
      },
      email: {
         email: "",
         email_type: "",
      },
      phone: {
         phone: "",
         area_code: "",
         country_code: "",
         phone_type: "",
      },
   });

   const [error, setError] = useState<string | null>(null);

   return (
      <Container>
         <form>
            <Steps.Root
               count={stepsData.length}
               linear
               isStepValid={(index) => stepsData[index]?.validate(formData as registerStudentForm) ?? true}
               onStepInvalid={(details) => {
                  setError(`Step ${details.step + 1} is invalid`);
               }}
            >
               <Steps.List>
                  {stepsData.map((step, index) => (
                     <Steps.Item key={index} index={index}>
                        <Steps.Trigger>
                           <Steps.Indicator />
                           <Box>
                              <Steps.Title>{step.title}</Steps.Title>
                              <Steps.Description>{step.description}</Steps.Description>
                           </Box>
                        </Steps.Trigger>
                        <Steps.Separator />
                     </Steps.Item>
                  ))}
               </Steps.List>

               {stepsData.map((step, index) => (
                  <Steps.Content key={index} index={index} maxW="xl">
                     {step.render({ formData: formData as registerStudentForm, setFormData, setError })}
                     {error && (
                        <Box color="red.fg" textStyle="sm" mt="3">
                           {error}
                        </Box>
                     )}
                  </Steps.Content>
               ))}

               <Steps.CompletedContent>
                  <Text>Registration complete!</Text>
               </Steps.CompletedContent>

               <ButtonGroup size="sm" variant="outline" mt="4">
                  <Steps.PrevTrigger asChild>
                     <Button>Atrás</Button>
                  </Steps.PrevTrigger>
                  <Steps.NextTrigger asChild>
                     <Button>siguiente</Button>
                  </Steps.NextTrigger>
               </ButtonGroup>
            </Steps.Root>
         </form>
      </Container>
   );
}

const stepsData: StepData[] = [
   {
      title: "Estudiante",
      description: "Información personal",
      validate(data) {
         const values = Object.values(data.studentInfo);
         console.log("values: ", values);
         if (values.some((value) => value.trim().length === 0)) {
            return false;
         }
         return true;
      },
      render(ctx) {
         return (
            <CardComponent
               width={"1400px"}
               title={<Text>Información del estudiante</Text>}
               description={{ description: "Por favor ingresa el la información personal del estudiante" }}
               body={{
                  children: (
                     <Stack direction={"row"}>
                        <Input
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
                        <Select.Root
                           collection={gendersCollections}
                           size="sm"
                           width="320px"
                           onValueChange={(e) => {
                              console.log("e: ", e);
                              ctx.setFormData({
                                 ...ctx.formData,
                                 studentInfo: { ...ctx.formData.studentInfo, gender: e.value[0] },
                              });
                              ctx.setError(null);
                           }}
                        >
                           <Select.HiddenSelect />
                           <Select.Control>
                              <Select.Trigger>
                                 <Select.ValueText placeholder="Género" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                 <Select.Indicator />
                              </Select.IndicatorGroup>
                           </Select.Control>
                           <Portal>
                              <Select.Positioner>
                                 <Select.Content>
                                    {gendersCollections.items.map((gender) => (
                                       <Select.Item item={gender} key={gender.value}>
                                          {gender.label}
                                          <Select.ItemIndicator />
                                       </Select.Item>
                                    ))}
                                 </Select.Content>
                              </Select.Positioner>
                           </Portal>
                        </Select.Root>
                     </Stack>
                  ),
               }}
            />
         );
      },
   },
   {
      title: "Email",
      description: "Enter your email",
      validate(data) {
         return data.email.email.includes("@");
      },
      render(ctx) {
         return (
            <Input
               type="email"
               placeholder="correo@ejemplo.com"
               value={ctx.formData.email.email}
               onChange={(e) => {
                  ctx.setFormData({ ...ctx.formData, email: { ...ctx.formData.email, email: e.target.value } });
                  ctx.setError(null);
               }}
            />
         );
      },
   },
];
