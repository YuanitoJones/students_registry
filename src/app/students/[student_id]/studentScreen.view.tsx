import CardComponent from "@/components/Cards/CardComponent";
import VariableSizeCarousel from "@/components/Carrousels/VariableSizeCarrousel";
import AddressDialogContent from "@/components/StudentInfoDialog/address/addressDialogContent";
import EmailDialogContent from "@/components/StudentInfoDialog/email/emailDialogContent";
import EmailRegistercontent from "@/components/StudentInfoDialog/email/emailRegisterContent";
import PhoneDialogContent from "@/components/StudentInfoDialog/phone/phoneDialogContent";
import PhoneRegisterContent from "@/components/StudentInfoDialog/phone/phoneRegisterContent";
import DialogComponent from "@/components/ui/dialogComponent";
import InfoField from "@/components/ui/infoField";
import { IAddress, IEmail, IPhone, IStudent } from "@/lib/types/globalTypes";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

function StudentScreen({ studentData }: { studentData: IStudent | undefined }) {
   const [openDialog, setOpenDialog] = useState(false);
   const [dialogContext, setDialogContext] = useState<any | undefined>(undefined);
   const [openRegister, setOpenRegister] = useState(false);
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
         setOpenRegister(true);
      } else {
         setDialogContext(e);
         setOpenDialog(true);
      }
   };
   return (
      <VStack px={10}>
         <CardComponent
            width={"full"}
            title={{
               children: (
                  <Text fontWeight={600} fontSize={"xl"} textAlign={"center"} mb={0}>
                     Información de estudiante
                  </Text>
               ),
            }}
            body={{
               children: !studentData ? (
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
                           slidesPerPage={2}
                           onClick={(reg, e) => handleOnClick({ reg, e, type: "address" })}
                        />
                     </HStack>
                  </VStack>
               ),
            }}
         />
         <DialogComponent open={openDialog} setOpen={setOpenDialog} title="Modificar estudiante">
            <DialogContent content={dialogContext} />
         </DialogComponent>
         {dialogType && (
            <DialogComponent open={openRegister} setOpen={setOpenRegister} title="Agregar info">
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
   if (type === "phone") return <PhoneRegisterContent />;
   if (type === "email") return <EmailRegistercontent />;
}
