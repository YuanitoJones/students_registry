"use client";
import CardComponent from "@/components/Cards/CardComponent";
import VariableSizeCarousel from "@/components/Carrousels/VariableSizeCarrousel";
import AddressDialogContent from "@/components/StudentInfoDialog/address/addressDialogContent";
import AddressRegistercontent from "@/components/StudentInfoDialog/address/addressRegisterContent";
import EmailDialogContent from "@/components/StudentInfoDialog/email/emailDialogContent";
import EmailRegistercontent from "@/components/StudentInfoDialog/email/emailRegisterContent";
import PhoneDialogContent from "@/components/StudentInfoDialog/phone/phoneDialogContent";
import PhoneRegisterContent from "@/components/StudentInfoDialog/phone/phoneRegisterContent";
import DialogComponent from "@/components/ui/dialogComponent";
import InfoField from "@/components/ui/infoField";
import { toaster } from "@/components/ui/toaster";
import studentRegistryClient from "@/lib/api/studentRegistryClient";
import { StudentContext } from "@/lib/context/studentContext";
import { IAddress, IEmail, IPhone } from "@/lib/types/globalTypes";
import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { LuTrash } from "react-icons/lu";

function StudentScreen() {
   const router = useRouter();
   const studentContext = useContext(StudentContext);
   if (!studentContext) throw new Error("no student context in provider");
   const { student_id, editDialog, registerdialog, SET_EDIT_DIALOG, SET_REGISTER_DIALOG, ...studentData } =
      studentContext;
   const [dialogContext, setDialogContext] = useState<any | undefined>(undefined);
   const [dialogType, setDialogType] = useState<"phone" | "email" | "address" | undefined>(undefined);

   const handleOnClick = <T extends IPhone | IEmail | IAddress>({
      reg,
      type,
      e = undefined,
   }: {
      reg?: boolean;
      type?: "phone" | "email" | "address";
      e?: T;
   }) => {
      if (reg) {
         setDialogType(type);
         SET_REGISTER_DIALOG(true);
      } else {
         setDialogContext(e);
         SET_EDIT_DIALOG(true);
      }
   };

   const handleDelete = async () => {
      await studentRegistryClient.deleteStudent(student_id);
      toaster.create({
         description: "Estudiante eliminado exitosamente.",
         type: "success",
      });
      router.replace("/dashboard");
   };
   return (
      <VStack px={10}>
         <CardComponent
            width={"full"}
            title={{
               children: (
                  <Box>
                     <Text fontWeight={600} fontSize={"xl"} textAlign={"center"} mb={0}>
                        Información de estudiante
                     </Text>
                     <IconButton
                        position={"absolute"}
                        right={0}
                        top={0}
                        variant={"ghost"}
                        color={"red"}
                        onClick={() => handleDelete()}
                     >
                        <LuTrash />
                     </IconButton>
                  </Box>
               ),
            }}
            body={{
               children: !student_id ? (
                  <Text textAlign={"center"}>Cargando...</Text>
               ) : (
                  <VStack gap={5}>
                     <HStack width={"100%"} justifyContent={"space-around"} display={"flex"}>
                        <InfoField
                           label="Nombre(s)"
                           value={`${studentData.first_name} ${studentData.middle_name}`}
                           size="sm"
                        />
                        <InfoField label="Apellidos" value={studentData.last_name} size="sm" />
                        <InfoField label="Género" value={studentData.gender} size="sm" />
                     </HStack>
                     <HStack width={"100%"} flexWrap={"wrap"} justifyContent={"space-evenly"}>
                        <VariableSizeCarousel
                           title="Correos asociados"
                           items={studentData.emails}
                           component="email"
                           orientation="vertical"
                           slidesPerPage={3}
                           onClick={(reg, e) => handleOnClick({ reg, e, type: "email" })}
                        />
                        <VariableSizeCarousel
                           title="Números de teléfono"
                           items={studentData.phones}
                           component="phone"
                           orientation="vertical"
                           slidesPerPage={2}
                           onClick={(reg, e) => handleOnClick({ reg, e, type: "phone" })}
                        />
                        <VariableSizeCarousel
                           title="Direcciones"
                           items={studentData.addresses}
                           component="address"
                           orientation="vertical"
                           slidesPerPage={1}
                           onClick={(reg, e) => handleOnClick({ reg, e, type: "address" })}
                        />
                     </HStack>
                  </VStack>
               ),
            }}
         />
         <DialogComponent title="Modificar estudiante" open={editDialog} setOpen={(open) => SET_EDIT_DIALOG(open)}>
            <DialogContent content={dialogContext} />
         </DialogComponent>
         {dialogType && (
            <DialogComponent title="Agregar info" open={registerdialog} setOpen={(open) => SET_REGISTER_DIALOG(open)}>
               <RegisterContent type={dialogType} />
            </DialogComponent>
         )}
      </VStack>
   );
}
export default StudentScreen;

function DialogContent<T extends IPhone | IEmail | IAddress>({ content }: { content: T }) {
   if ("phone_id" in content) return <PhoneDialogContent phone={content} />;
   if ("email" in content) return <EmailDialogContent email={content} />;
   if ("address_id" in content) return <AddressDialogContent address={content} />;
}

function RegisterContent({ type }: { type: "phone" | "email" | "address" }) {
   let component;
   switch (type) {
      case "phone":
         component = <PhoneRegisterContent />;
         break;
      case "email":
         component = <EmailRegistercontent />;
         break;
      case "address":
         component = <AddressRegistercontent />;
         break;
      default:
         component = <div />;
         break;
   }
   return component;
}
