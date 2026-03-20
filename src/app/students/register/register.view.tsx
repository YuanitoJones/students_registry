"use client";
import { Box, Button, ButtonGroup, Container, Steps, Text } from "@chakra-ui/react";
import { registerStudentForm, StepData, StudentRegistryLogic } from "./register.types";
import { useState } from "react";
import EmailRegisterstep from "@/components/stepper/emailRegisterStep";
import BasicinfoStep from "@/components/stepper/basicinfoRegisterstep";
import PhoneRegisterStep from "@/components/stepper/phoneRegisterStep";
import AddressRegisterStep from "@/components/stepper/addressRegisterStep";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";

export function StudentRegistryView() {
   const router = useRouter();
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
      address: {
         address_line: "",
         city: "",
         state: "",
         zip_postcode: "",
      },
   });

   const [error, setError] = useState<string | null>(null);

   const handleSubmit = async () => {
      const isAddressEmpty = Object.values(formData.address).every((value) => value.trim() === "");
      const dataToSubmit = isAddressEmpty
         ? { studentInfo: formData.studentInfo, email: formData.email, phone: formData.phone }
         : { ...formData };
      const response = await studentRegistryClient.createStudent(dataToSubmit);
      toaster.create({
         title: "Estudiante creado con éxito",
         type: "success",
      });
      router.replace("/dashboard");
   };

   return (
      <Container>
         <form>
            <Steps.Root
               onStepComplete={() => handleSubmit()}
               count={stepsData.length}
               linear
               isStepValid={(index) => stepsData[index]?.validate(formData as registerStudentForm) ?? true}
               onStepInvalid={(details) => {
                  setError("Favor de llenar todos los campos");
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
         if (values.some((value) => value.trim().length === 0)) {
            return false;
         }
         return true;
      },
      render(ctx) {
         return <BasicinfoStep ctx={ctx} />;
      },
   },
   {
      title: "Correo",
      description: "Información de correo",
      validate(data) {
         return data.email.email.includes("@");
      },
      render(ctx) {
         return <EmailRegisterstep ctx={ctx} />;
      },
   },
   {
      title: "Número telefónico",
      description: "Información de teléfono",
      validate(data) {
         const values = Object.values(data.phone);
         if (values.some((value) => value.trim().length === 0)) {
            return false;
         }
         return true;
      },
      render(ctx) {
         return <PhoneRegisterStep ctx={ctx} />;
      },
   },
   {
      title: "Dirección",
      description: "Información de la dirección (opcional)",
      validate(data) {
         const values = Object.values(data.address).map((v) => v.trim());
         const allEmpty = values.every((v) => v.length === 0);
         const allFilled = values.every((v) => v.length > 0);
         return allEmpty || allFilled;
      },
      render(ctx) {
         return <AddressRegisterStep ctx={ctx} />;
      },
   },
];
