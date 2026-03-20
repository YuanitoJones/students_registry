import { StudentContext } from "@/lib/context/studentContext";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useContext } from "react";

interface DialogComponentProps extends Dialog.RootProps {
   open: boolean;
   setOpen: (open: boolean) => void;
   title?: string;
   children: React.ReactNode;
}

const DialogComponent = ({ title, children, open, setOpen }: DialogComponentProps) => {
   const studentContext = useContext(StudentContext);
   if (!studentContext) throw new Error("no student context in provider");
   return (
      <Dialog.Root lazyMount open={open} placement={"center"}>
         <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
               <Dialog.Content minWidth={"600px"}>
                  {title && (
                     <Dialog.Header>
                        <Dialog.Title>{title}</Dialog.Title>
                     </Dialog.Header>
                  )}
                  <Dialog.Body>{children}</Dialog.Body>
                  <Dialog.CloseTrigger asChild onClick={() => setOpen(false)}>
                     <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   );
};

export default DialogComponent;
