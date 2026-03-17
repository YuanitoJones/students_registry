import { IPhone } from "@/lib/types/globalTypes";
import { HStack, VStack } from "@chakra-ui/react";
import InfoField from "../ui/infoField";

export const PhoneCardComponent = ({ phone }: { phone: IPhone }) => {
   return (
      <VStack py={3}>
         <HStack maxWidth={"100%"} wrap={"wrap"}>
            <InfoField label="Número de teléfono" value={phone.phone} size="xs" />
            <InfoField label="Tipo de teléfono" value={phone.phone_type} size="xs" />
            <InfoField label="Código de pais" value={phone.country_code} size="xs" />
            <InfoField label="Código de área" value={phone.area_code} size="xs" />
         </HStack>
      </VStack>
   );
};
