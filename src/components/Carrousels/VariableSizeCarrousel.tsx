import { IAddress, IEmail, IPhone } from "@/lib/types/globalTypes";
import { Box, Button, Carousel, Center, HStack, IconButton, VStack } from "@chakra-ui/react";
import { LuChevronDown, LuChevronUp, LuPencil, LuPlus } from "react-icons/lu";
import { EmailCardComponent } from "../Cards/emailCardComponent";
import { PhoneCardComponent } from "../Cards/phoneCardComponent";
import { AddressCardComponent } from "../Cards/AddressCardComponent";

interface VariableSizeCarouselProps {
   items: any[];
   component: "email" | "phone" | "address";
   slidesPerPage?: number;
   orientation?: "horizontal" | "vertical";
   title?: string;
   onClick?: (regiser: boolean, e?: IEmail | IPhone | IAddress) => void;
}
const VariableSizeCarousel = ({
   items,
   slidesPerPage = 1,
   orientation = "horizontal",
   title,
   onClick,
}: VariableSizeCarouselProps) => {
   return (
      <VStack flex={1} pb={2}>
         {title && (
            <Center fontSize={"md"} fontWeight={600}>
               {title}
            </Center>
         )}
         <Box display={"flex"} width={"100%"} px={5}>
            <Button variant={"ghost"} size={"xs"} p={0} onClick={() => onClick?.(true)}>
               <LuPlus />
               Agregar nuevo
            </Button>
         </Box>
         <Carousel.Root
            slideCount={items.length}
            height={"400px"}
            orientation={orientation}
            slidesPerPage={slidesPerPage}
            mx={"auto"}
         >
            <Carousel.ItemGroup>
               {items.map((item, index) => (
                  <CarouselItem item={item} index={index} onClick={onClick} />
               ))}
            </Carousel.ItemGroup>
            <Carousel.Control display={"flex"} justifyContent={"space-evenly"}>
               <Carousel.PrevTrigger asChild>
                  <IconButton size="xs" variant="surface">
                     <LuChevronUp />
                  </IconButton>
               </Carousel.PrevTrigger>
               <Carousel.NextTrigger asChild>
                  <IconButton size="xs" variant="surface">
                     <LuChevronDown />
                  </IconButton>
               </Carousel.NextTrigger>
            </Carousel.Control>
         </Carousel.Root>
      </VStack>
   );
};

export default VariableSizeCarousel;

interface CarouselitemProps<T> {
   item: T;
   index: number;
   onClick?: (register: boolean, e: T) => void;
}
function CarouselItem({ item, index, onClick }: CarouselitemProps<IEmail | IPhone | IAddress>) {
   const children =
      "phone" in item ? (
         <PhoneCardComponent phone={item} />
      ) : "email" in item ? (
         <EmailCardComponent email={item} />
      ) : "address_line" in item ? (
         <AddressCardComponent address={item} />
      ) : null;

   return (
      <Carousel.Item
         key={typeof item === "string" ? item : JSON.stringify(item)}
         index={index}
         width="auto"
         py={3}
         px={1}
      >
         {onClick && (
            <IconButton
               size="xs"
               variant="ghost"
               position={"relative"}
               top={8}
               left={"91%"}
               onClick={() => onClick(false, item)}
            >
               <LuPencil />
            </IconButton>
         )}
         <Center style={{ width: "360px" }} bg="bg.subtle" rounded="lg" boxShadow={"md"}>
            {children}
         </Center>
      </Carousel.Item>
   );
}
