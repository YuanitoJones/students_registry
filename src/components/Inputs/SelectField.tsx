"use client";
import { ListCollection, Portal, Select } from "@chakra-ui/react";

interface SelectFieldProps extends Select.RootProps {
   items: any[];
   collection: ListCollection;
   onValueChange: (e: any) => void;
}

const SelectField = (props: SelectFieldProps) => {
   const { items, collection, onValueChange, ...rootprops } = props;

   return (
      <Select.Root {...rootprops} collection={collection} onValueChange={onValueChange} size="sm" width="320px">
         <Select.HiddenSelect />
         <Select.Control>
            <Select.Trigger>
               <Select.ValueText placeholder="Género" />
            </Select.Trigger>
            <Select.IndicatorGroup>
               <Select.Indicator />
            </Select.IndicatorGroup>
         </Select.Control>
         <Portal>
            <Select.Positioner zIndex="popover">
               <Select.Content>
                  {items.map((item) => (
                     <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                     </Select.Item>
                  ))}
               </Select.Content>
            </Select.Positioner>
         </Portal>
      </Select.Root>
   );
};

export default SelectField;
