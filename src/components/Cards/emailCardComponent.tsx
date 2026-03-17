import { IEmail } from "@/lib/types/globalTypes";
import { HStack, VStack } from "@chakra-ui/react";
import InfoField from "../ui/infoField";

interface IEmailCardComponent {
   email: IEmail;
   onDelete?: (email: string) => void;
}

export const EmailCardComponent = ({ email }: IEmailCardComponent) => {
   return (
      <VStack py={3}>
         <HStack>
            <InfoField label="Correo" value={email.email} size="xs" />
            <InfoField label="Tipo de correo" value={email.email_type} size="xs" />
         </HStack>
      </VStack>
   );
};
