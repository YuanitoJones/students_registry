import { StudentContext } from "@/lib/context/studentContext";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useContext } from "react";

interface DialogComponentProps extends Dialog.RootProps {
   open: boolean;
   setOpen: (details: any) => void;
   title?: string;
   children: React.ReactNode;
}

const ConfirmationDialog = ({ title, children, open, setOpen }: DialogComponentProps) => {
   return (
      <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
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
                  <Dialog.CloseTrigger asChild>
                     <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
               </Dialog.Content>
            </Dialog.Positioner>
         </Portal>
      </Dialog.Root>
   );
};

export default ConfirmationDialog;
