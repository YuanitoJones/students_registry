import CardComponent from "@/components/Cards/CardComponent";
import VariableSizeCarousel from "@/components/Carrousels/VariableSizeCarrousel";
import InfoField from "@/components/ui/infoField";
import { IStudent } from "@/lib/types/globalTypes";
import { HStack, Text, VStack } from "@chakra-ui/react";

function StudentScreen({ studentData }: { studentData: IStudent | undefined }) {
   return (
      <VStack py={5} px={10}>
         <CardComponent
            width={"full"}
            title={{
               children: (
                  <Text fontWeight={600} fontSize={"xl"} textAlign={"center"} mb={-2}>
                     Información de estudiante
                  </Text>
               ),
            }}
            body={{
               children: !studentData ? (
                  <Text textAlign={"center"}>Cargando...</Text>
               ) : (
                  <VStack gap={0}>
                     <HStack maxWidth={"100%"} flexWrap={"wrap"}>
                        <InfoField label="Nombre(s)" value={`${studentData.first_name} ${studentData.middle_name}`} />
                        <InfoField label="Apellidos" value={studentData.last_name} />
                        <InfoField label="Género" value={studentData.gender} />
                     </HStack>
                     <VStack width={"100%"}>
                        <Text>Correos asociados</Text>
                        <VariableSizeCarousel items={studentData.emails} component="email" />
                     </VStack>
                     <VStack width={"100%"}>
                        <Text>Números de teléfono</Text>
                        <VariableSizeCarousel items={studentData.phones} component="phone" />
                     </VStack>
                     <VStack width={"100%"}>
                        <Text>Direcciones</Text>
                        <VariableSizeCarousel items={studentData.addresses} component="address" />
                     </VStack>
                  </VStack>
               ),
            }}
         />
      </VStack>
   );
}
export default StudentScreen;
