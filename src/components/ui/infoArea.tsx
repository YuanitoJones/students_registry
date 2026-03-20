import { Text, Textarea, VStack } from "@chakra-ui/react";

interface InfoAreaProps {
   label: string;
   value: string;
   size?: "xs" | "sm" | "md" | "lg" | "xl";
}
const InfoArea = ({ label, value, size = "md" }: InfoAreaProps) => {
   return (
      <VStack gap={1} width={"100%"} display={"flex"} justifyContent={"start"} px={2}>
         <Text width={"100%"} textAlign={"left"} fontSize={size}>
            {label}
         </Text>
         <Textarea value={value} contentEditable={false} size={size} w={"100%"} maxLines={2} pointerEvents={"none"} />
      </VStack>
   );
};

export default InfoArea;
