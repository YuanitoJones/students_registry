import { Input, Text, VStack } from "@chakra-ui/react";

interface InfoFieldProps {
   label: string;
   value: string;
   size?: "xs" | "md" | "lg" | "xl";
}

const InfoField = ({ label, value, size = "md" }: InfoFieldProps) => {
   return (
      <VStack justifyContent={"start"} display={"flex"} px={2}>
         <Text width={"100%"} fontSize={size}>
            {label}
         </Text>
         <Input value={value} contentEditable={false} size={size} w={"auto"} />
      </VStack>
   );
};

export default InfoField;
