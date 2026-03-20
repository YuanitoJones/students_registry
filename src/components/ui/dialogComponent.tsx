import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface DialogComponentProps extends Dialog.RootProps {
   open: boolean;
   setOpen: (open: boolean) => void;
   title?: string;
   children: React.ReactNode;
}

const DialogComponent = ({ open, setOpen, title, children }: DialogComponentProps) => {
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

export default DialogComponent;
