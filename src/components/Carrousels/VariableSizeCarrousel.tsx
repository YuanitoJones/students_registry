import { IAddress, IEmail, IPhone } from "@/lib/types/globalTypes";
import { Carousel, Center, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { EmailCardComponent } from "../Cards/emailCardComponent";
import { PhoneCardComponent } from "../Cards/phoneCardComponent";
import { AddressCardComponent } from "../Cards/AddressCardComponent";

interface VariableSizeCarouselProps {
   items: any[];
   component: "email" | "phone" | "address";
}
const VariableSizeCarousel = ({ items, component }: VariableSizeCarouselProps) => {
   return (
      <Carousel.Root slideCount={items.length} autoSize spacing="30px" width="100%" mx="auto">
         <Carousel.ItemGroup>
            {items.map((item, index) => {
               switch (component) {
                  case "email":
                     return emailComponent(item, index);
                  case "phone":
                     return phoneComponent(item, index);
                  case "address":
                     return addressComponent(item, index);
                  default:
                     break;
               }
               return null;
            })}
         </Carousel.ItemGroup>
         <Carousel.Control gap="25">
            <Carousel.PrevTrigger asChild>
               <IconButton size="xs" variant="surface">
                  <LuChevronLeft />
               </IconButton>
            </Carousel.PrevTrigger>
            <Carousel.NextTrigger asChild>
               <IconButton size="xs" variant="surface">
                  <LuChevronRight />
               </IconButton>
            </Carousel.NextTrigger>
         </Carousel.Control>
      </Carousel.Root>
   );
};

export default VariableSizeCarousel;

function emailComponent(item: IEmail, index: number) {
   return (
      <Carousel.Item key={item.email} index={index} width="auto" py={3} px={1}>
         <Center style={{ width: "360px" }} bg="bg.subtle" rounded="lg" boxShadow={"md"}>
            <EmailCardComponent email={item} />
         </Center>
      </Carousel.Item>
   );
}

function phoneComponent(item: IPhone, index: number) {
   return (
      <Carousel.Item key={item.phone} index={index} width="auto" py={3} px={1}>
         <Center style={{ width: "360px" }} bg="bg.subtle" rounded="lg" boxShadow={"md"}>
            <PhoneCardComponent phone={item} />
         </Center>
      </Carousel.Item>
   );
}

function addressComponent(item: IAddress, index: number) {
   return (
      <Carousel.Item key={item.address_line} index={index} width="auto" py={3} px={1}>
         <Center style={{ width: "360px" }} bg="bg.subtle" rounded="lg" boxShadow={"md"}>
            <AddressCardComponent address={item} />
         </Center>
      </Carousel.Item>
   );
}
