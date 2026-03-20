import { ListCollection, Portal, Select } from "@chakra-ui/react";

interface SelectFieldProps extends Select.RootProps {
   items: any[];
   collection: ListCollection;
   onValueChange: (e: any) => void;
}
const SelectField = (props: SelectFieldProps) => {
   const { items, collection, onValueChange } = props;
   return (
      <Select.Root collection={collection} size="sm" width="320px" onValueChange={onValueChange}>
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
            <Select.Positioner>
               <Select.Content>
                  {items.map((item) => (
                     <Select.Item item={item} key={item.value.value}>
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
