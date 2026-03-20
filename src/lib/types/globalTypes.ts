import { createListCollection } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface formType<T extends FieldValues> {
   register: UseFormRegister<T>;
   onSubmit: (values: any) => void;
}

export enum genders {
   Masculino = "masculino",
   Feminino = "feminino",
   Otro = "otro",
}

export const gendersCollections = createListCollection({
   items: Object.keys(genders).map((gender) => ({ label: gender, value: gender })),
});

export interface IStudent {
   student_id: string;
   first_name: string;
   middle_name: string;
   last_name: string;
   gender: genders | string;
   phones: IPhone[];
   emails: IEmail[];
   addresses: IAddress[];
}

export interface IEmail {
   email: string;
   email_type: string;
}

export interface IPhone {
   phone_id: number;
   phone: string;
   area_code: string;
   country_code: string;
   phone_type: string;
}

export interface IAddress {
   address_id: number;
   address_line: string;
   city: string;
   zip_postcode: string;
   state: string;
}
