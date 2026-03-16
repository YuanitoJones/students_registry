import { FieldValues, UseFormRegister } from "react-hook-form";

export interface formType<T extends FieldValues> {
   register: UseFormRegister<T>;
   onSubmit: (values: any) => void;
}
