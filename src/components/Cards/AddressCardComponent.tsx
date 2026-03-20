import { IAddress } from "@/lib/types/globalTypes";
import { HStack, VStack } from "@chakra-ui/react";
import InfoField from "../ui/infoField";
import InfoArea from "../ui/infoArea";

export const AddressCardComponent = ({ address }: { address: IAddress }) => {
   return (
      <VStack py={3}>
         <InfoArea label="Dirección" value={address.address_line} size="xs" />
         <HStack maxWidth={"100%"} wrap={"wrap"}>
            <InfoField label="Estado" value={address.state} size="xs" />
            <InfoField label="Ciudad" value={address.city} size="xs" />
            <InfoField label="Código postal" value={address.zip_postcode} size="xs" />
         </HStack>
      </VStack>
   );
};
